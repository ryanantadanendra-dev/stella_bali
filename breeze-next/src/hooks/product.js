import useSWR from 'swr'
import axios from '@/lib/axios'
import { useCallback, useMemo } from 'react'

// Memoized fetcher function
const fetcher = async url => {
    const response = await axios.get(url)
    return response.data
}

export const useProduct = () => {
    // CSRF token helper
    const csrf = useCallback(async () => {
        await axios.get('/sanctum/csrf-cookie')
    }, [])

    // Optimized SWR config
    const { data, error, mutate, isLoading } = useSWR(
        '/api/dashboard/products',
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // 1 minute
            shouldRetryOnError: false,
            onError: err => {
                if (err.response?.status === 409) {
                    // Handle 409 specifically
                    return null
                }
                console.error('Error fetching products:', err)
            },
        },
    )

    // Memoize products and categories
    const products = useMemo(() => data?.data || [], [data?.data])
    const categories = useMemo(() => data?.categories || [], [data?.categories])

    // Optimized add function
    const add = useCallback(
        async formData => {
            try {
                await csrf()

                const data = new FormData()

                // Append basic fields
                data.append('name', formData.name)
                data.append('description', formData.description)
                data.append('type', formData.type)
                data.append('subtype', formData.subtype)
                data.append('price', formData.price)

                // Append images if present
                if (formData.images?.length > 0) {
                    formData.images.forEach(image =>
                        data.append('images[]', image),
                    )
                }

                // Filter and append valid colors
                const filteredColors = (formData.colors || []).filter(
                    color =>
                        typeof color === 'string' &&
                        /^#[0-9A-Fa-f]{6}$/i.test(color),
                )
                if (filteredColors.length > 0) {
                    filteredColors.forEach(color =>
                        data.append('colors[]', color),
                    )
                }

                const response = await axios.post(
                    '/api/dashboard/product/add',
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )

                // Optimistic update
                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error adding product:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    // Optimized delete function
    const deleteData = useCallback(
        async id => {
            try {
                await csrf()

                const response = await axios.delete(
                    `/api/dashboard/product/delete/${id}`,
                )

                // Optimistic update - remove from local data immediately
                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error deleting product:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    // Optimized edit function
    const edit = useCallback(
        async (id, formData) => {
            try {
                await csrf()

                const data = new FormData()

                // Append basic fields
                data.append('name', formData.name)
                data.append('description', formData.description)
                data.append('type', formData.type)
                data.append('subtype', formData.subtype)
                data.append('price', formData.price)

                // Filter and append valid colors
                const filteredColors = (formData.colors || []).filter(
                    color =>
                        typeof color === 'string' &&
                        /^#[0-9A-Fa-f]{6}$/i.test(color),
                )

                if (filteredColors.length === 0) {
                    data.append('colors[]', '#000000')
                } else {
                    filteredColors.forEach(color =>
                        data.append('colors[]', color),
                    )
                }

                data.append('_method', 'PUT')

                const response = await axios.post(
                    `/api/dashboard/product/edit/${id}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )

                // Optimistic update
                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error editing product:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    // Optimized addImage function
    const addImage = useCallback(
        async (id, formData) => {
            try {
                await csrf()

                const data = new FormData()

                if (!formData.images || formData.images.length === 0) {
                    throw new Error('No images provided')
                }

                formData.images.forEach(image => data.append('images[]', image))

                const response = await axios.post(
                    `/api/dashboard/product/add/image/${id}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )

                // Optimistic update
                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error adding image:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    // Optimized deleteImage function
    const deleteImage = useCallback(
        async id => {
            try {
                await csrf()

                const response = await axios.delete(
                    `/api/dashboard/product/delete/image/${id}`,
                )

                // Optimistic update
                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error deleting image:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    return {
        products,
        categories,
        isLoading,
        isError: error,
        add,
        deleteData,
        edit,
        addImage,
        deleteImage,
        mutate, // Expose mutate for manual refresh
    }
}

// ============================================
// ALTERNATIVE: Optimistic Updates Version
// ============================================
export const useProductOptimistic = () => {
    const csrf = useCallback(async () => {
        await axios.get('/sanctum/csrf-cookie')
    }, [])

    const { data, error, mutate, isLoading } = useSWR(
        '/api/dashboard/products',
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        },
    )

    const products = useMemo(() => data?.data || [], [data?.data])
    const categories = useMemo(() => data?.categories || [], [data?.categories])

    // Optimistic add with immediate UI update
    const add = useCallback(
        async formData => {
            try {
                // Create optimistic product
                const optimisticProduct = {
                    id: `temp-${Date.now()}`,
                    name: formData.name,
                    description: formData.description,
                    type: formData.type,
                    subtype: formData.subtype,
                    price: formData.price,
                    colors: formData.colors || [],
                    images: [],
                    created_at: new Date().toISOString(),
                }

                // Optimistic update - add to UI immediately
                await mutate(
                    {
                        ...data,
                        data: [...(data?.data || []), optimisticProduct],
                    },
                    false, // Don't revalidate yet
                )

                await csrf()

                const formDataObj = new FormData()
                formDataObj.append('name', formData.name)
                formDataObj.append('description', formData.description)
                formDataObj.append('type', formData.type)
                formDataObj.append('subtype', formData.subtype)
                formDataObj.append('price', formData.price)

                if (formData.images?.length > 0) {
                    formData.images.forEach(image =>
                        formDataObj.append('images[]', image),
                    )
                }

                const filteredColors = (formData.colors || []).filter(
                    color =>
                        typeof color === 'string' &&
                        /^#[0-9A-Fa-f]{6}$/i.test(color),
                )
                if (filteredColors.length > 0) {
                    filteredColors.forEach(color =>
                        formDataObj.append('colors[]', color),
                    )
                }

                const response = await axios.post(
                    '/api/dashboard/product/add',
                    formDataObj,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )

                // Revalidate with real data
                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                // Rollback optimistic update on error
                await mutate()
                console.error('Error adding product:', error)
                throw error
            }
        },
        [csrf, mutate, data],
    )

    // Optimistic delete with immediate UI update
    const deleteData = useCallback(
        async id => {
            try {
                // Optimistic update - remove from UI immediately
                await mutate(
                    {
                        ...data,
                        data: (data?.data || []).filter(
                            product => product.id !== id,
                        ),
                    },
                    false,
                )

                await csrf()

                const response = await axios.delete(
                    `/api/dashboard/product/delete/${id}`,
                )

                // Revalidate with real data
                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                // Rollback optimistic update on error
                await mutate()
                console.error('Error deleting product:', error)
                throw error
            }
        },
        [csrf, mutate, data],
    )

    const edit = useCallback(
        async (id, formData) => {
            try {
                await csrf()

                const formDataObj = new FormData()
                formDataObj.append('name', formData.name)
                formDataObj.append('description', formData.description)
                formDataObj.append('type', formData.type)
                formDataObj.append('subtype', formData.subtype)
                formDataObj.append('price', formData.price)

                const filteredColors = (formData.colors || []).filter(
                    color =>
                        typeof color === 'string' &&
                        /^#[0-9A-Fa-f]{6}$/i.test(color),
                )

                if (filteredColors.length === 0) {
                    formDataObj.append('colors[]', '#000000')
                } else {
                    filteredColors.forEach(color =>
                        formDataObj.append('colors[]', color),
                    )
                }

                formDataObj.append('_method', 'PUT')

                const response = await axios.post(
                    `/api/dashboard/product/edit/${id}`,
                    formDataObj,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )

                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error editing product:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    const addImage = useCallback(
        async (id, formData) => {
            try {
                await csrf()

                const formDataObj = new FormData()

                if (!formData.images || formData.images.length === 0) {
                    throw new Error('No images provided')
                }

                formData.images.forEach(image =>
                    formDataObj.append('images[]', image),
                )

                const response = await axios.post(
                    `/api/dashboard/product/add/image/${id}`,
                    formDataObj,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )

                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error adding image:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    const deleteImage = useCallback(
        async id => {
            try {
                await csrf()

                const response = await axios.delete(
                    `/api/dashboard/product/delete/image/${id}`,
                )

                if (response.status === 201) {
                    await mutate()
                }

                return response
            } catch (error) {
                console.error('Error deleting image:', error)
                throw error
            }
        },
        [csrf, mutate],
    )

    return {
        products,
        categories,
        isLoading,
        isError: error,
        add,
        deleteData,
        edit,
        addImage,
        deleteImage,
        mutate,
    }
}
