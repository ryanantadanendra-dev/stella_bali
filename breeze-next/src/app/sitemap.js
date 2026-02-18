import axios from '@/lib/axios'

export default async function sitemap() {
    const baseUrl = 'https://stellabali.com'

    // Fetch products and blogs dynamically
    const [productsRes, blogsRes] = await Promise.all([
        axios.get('/api/dashboard/products'),
        axios.get('/api/dashboard/blogs'),
    ])

    const products = productsRes.data.data || [] // adjust if your API returns differently
    const blogs = blogsRes.data.data || []

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // Dynamic product pages
    const productPages = products.map(p => ({
        url: `${baseUrl}/product/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.createdAt),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    // Dynamic blog pages
    const blogPages = blogs.map(b => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(b.updatedAt || b.createdAt),
        changeFrequency: 'monthly',
        priority: 0.9,
    }))

    return [...staticPages, ...productPages, ...blogPages]
}
