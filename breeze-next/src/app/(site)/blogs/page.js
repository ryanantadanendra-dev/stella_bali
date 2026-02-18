import Hero from '@/components/Hero'
import Slider from '@/components/Slider'
import HighlightBlogs from '@/components/HIghlighBlogs'

export const metadata = {
    title: 'Stella Bali Journal | Beach Style Tips & Island Stories',
    description:
        'Inspirasi gaya pantai, tips fashion pria dan wanita, hingga cerita dari jantung pulau Bali. Temukan cara tampil maksimal dengan konsep Everyday Ease di Stella Bali Journal.',
    keywords: [
        'tips fashion pantai',
        'Bali travel style',
        'cara merawat baju linen',
        'outfit liburan ke Bali',
        'beachwear trends 2026',
        'Stella Bali Blog',
        'gaya hidup pesisir',
        'summer outfit ideas',
        'mix and match baju pantai',
    ],
    openGraph: {
        title: 'Stella Bali Journal | Your Guide to Island Living',
        description:
            'Kumpulan artikel tentang fashion, travel, dan gaya hidup santai ala Bali. Update gaya harianmu di sini.',
        siteName: 'stellabali.com',
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Stella Bali | Bali Breeze & Everyday Ease',
        description:
            'Effortless, breathable beachwear designed for the tropical soul. Discover lightweight essentials that bring the spirit of Bali to your everyday wardrobe.',
        creator: '@stellabaligroup',
        images: [],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
    },
}

const Blogs = () => {
    return (
        <>
            <header>
                <Hero title="News & Article" />
            </header>
            <main className="w-full h-full lg:min-h-screen py-12 md:pb-12">
                <HighlightBlogs />
                <Slider />
            </main>
        </>
    )
}
export default Blogs
