import axios from '@/lib/axios'

export default async function getProducts() {
    const res = await axios.get('/api/dashboard/products')

    return {
        products: res.data,
    }
}
