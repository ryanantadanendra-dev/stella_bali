import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useProduct = () => {
    const router = useRouter()
    const params = useParams()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const {
        data: products,
        error,
        mutate,
    } = useSWR(
        '/api/dashboard/products',
        async () =>
            await axios
                .get('/api/dashboard/products')
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status !== 409) throw error
                }),
    )

    const add = async formData => {
        await csrf()

        const data = new FormData()

        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('type', formData.type)
        data.append('subtype', formData.subtype)
        data.append('price', formData.price)
        formData.images?.forEach(image => data.append('images[]', image))
        const filteredColors = (formData.colors || []).filter(
            color =>
                typeof color === 'string' && /^#[0-9A-Fa-f]{6}$/.test(color),
        )
        filteredColors.forEach(color => data.append('colors[]', color))

        const response = await axios.post('/api/dashboard/product/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.status === 201) {
            mutate()
        }

        return response
    }

    const deleteData = async id => {
        await csrf()

        const response = await axios.delete(
            `/api/dashboard/product/delete/${id}`,
        )

        if (response.status === 201) {
            mutate()
        }

        return response
    }

    const edit = async (id, formData) => {
        await csrf()

        const data = new FormData()

        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('type', formData.type)
        data.append('subtype', formData.subtype)
        data.append('price', formData.price)
        const filteredColors = (formData.colors || []).filter(
            color =>
                typeof color === 'string' && /^#[0-9A-Fa-f]{6}$/.test(color),
        )
        if (filteredColors.length === 0) {
            data.append('colors[]', '#000000')
        } else {
            filteredColors.forEach(color => data.append('colors[]', color))
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

        if (response.status === 201) {
            mutate()
        }

        return response
    }

    const addImage = async (id, formData) => {
        await csrf()

        const data = new FormData()

        formData.images?.forEach(image => data.append('images[]', image))

        const response = await axios.post(
            `/api/dashboard/product/add/image/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )

        if (response.status === 201) {
            mutate()
        }

        return response
    }

    const deleteImage = async id => {
        await csrf()

        const response = await axios.delete(
            `/api/dashboard/product/delete/image/${id}`,
        )

        if (response.status === 201) {
            mutate()
        }

        return response
    }

    return {
        products,
        add,
        deleteData,
        edit,
        addImage,
        deleteImage,
    }
}
