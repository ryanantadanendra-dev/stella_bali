import axios from '@/lib/axios'
import useSWR from 'swr'

export const useBlog = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const {
        data: blogs,
        error,
        mutate,
    } = useSWR(
        '/api/dashboard/blogs',
        async () =>
            await axios
                .get('/api/dashboard/blogs')
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status !== 409) throw error
                }),
    )

    const add = async formData => {
        await csrf()

        const data = new FormData()

        data.append('title', formData.title)
        data.append('subtitle', formData.subtitle)
        data.append('content', formData.content)
        data.append('image', formData.image)

        const response = await axios.post('/api/dashboard/blogs/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.status === 201) mutate()

        return response
    }

    const deleteData = async id => {
        await csrf()

        const response = await axios.delete(`/api/dashboard/blogs/delete/${id}`)

        if (response.status === 201) mutate()

        return response
    }

    const edit = async (id, formData) => {
        await csrf()

        const data = new FormData()

        data.append('title', formData.title)
        data.append('subtitle', formData.subtitle)
        data.append('content', formData.content)
        data.append('_method', 'PUT')

        const response = await axios.post(
            `/api/dashboard/blogs/edit/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )

        if (response.status === 201) mutate()

        return response
    }

    const editImage = async (id, formData) => {
        await csrf()

        const data = new FormData()

        data.append('image', formData.image)
        data.append('_method', 'PUT')

        const response = axios.post(
            `/api/dashboard/blogs/edit/image/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )

        if ((await response).status) mutate()

        return response
    }

    return { blogs, add, deleteData, edit, editImage }
}
