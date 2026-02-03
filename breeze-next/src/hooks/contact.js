import axios from '@/lib/axios'
import useSWR from 'swr'

export const useContact = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const {
        data: contact,
        error,
        isLoading,
        mutate,
    } = useSWR(
        '/api/dashboard/contact',
        async () =>
            await axios
                .get('/api/dashboard/contact')
                .then(res => res.data)
                .catch(error => {
                    throw error
                }),
    )

    const edit = async (id, formData) => {
        await csrf()

        const data = new FormData()

        data.append('phone', formData.phone)
        data.append('_method', 'PUT')

        const response = await axios.post(
            `/api/dashboard/contact/edit/${id}`,
            data,
        )

        if (response.status === 201) mutate()

        return response
    }

    return {
        contact,
        edit,
    }
}
