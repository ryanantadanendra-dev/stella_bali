import axios from '@/lib/axios'

// server fetch method
export async function getBlogs() {
    const res = await axios.get('/api/dashboard/blogs')
    return {
        blogs: res.data.data,
    }
}
