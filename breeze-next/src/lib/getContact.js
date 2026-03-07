import axios from './axios'

export default async function getContact() {
    const res = await axios.get('api/dashboard/contact')

    return {
        contact: res.data,
    }
}
