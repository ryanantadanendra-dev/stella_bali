import { userAgent } from 'next/server'
import sitemap from './sitemap'

export default function robots() {
    const baseUrl = 'stellabali.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/login'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/dashboard/', '/login'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
