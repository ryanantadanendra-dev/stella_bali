import { Carousel } from '@/components/Carousel'
import SearchBar from '@/components/SearchBar'
import NewArrival from '@/components/NewArrival'
import dynamic from 'next/dynamic'

// Lazy load non-critical components
const Collections = dynamic(() => import('@/components/Collections'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200" />,
})

const Blogs = dynamic(() => import('@/components/Blogs'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200" />,
})

export const metadata = {
    title: 'Beach Clothing & Resort Wear — Swimwear, Cover Ups & More | Stella Bali',
    description:
        'Shop premium beach clothing including swimwear, tops, bottoms, dresses & Accessories. Stylish, comfortable & perfect for summer holidays and tropical getaways.',
    keywords: [
        'Stella Bali',
        'Bali Breeze Everyday Ease',
        'resort wear Bali',
        'breathable beachwear',
        'baju pantai Bali',
        'pakaian resort',
        'linen clothing Bali',
        'baju bahan linen',
        'island essentials',
        'brand lokal Bali',
        'pakaian musim panas',
    ],
    openGraph: {
        title: 'Beach Clothing & Resort Wear — Swimwear, Cover Ups & More | Stella Bali',
        description:
            'Shop premium beach clothing including swimwear, tops, bottoms, dresses & Accessories. Stylish, comfortable & perfect for summer holidays and tropical getaways.',
        siteName: 'stellabali.com',
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Beach Clothing & Resort Wear — Swimwear, Cover Ups & More | Stella Bali',
        description:
            'Shop premium beach clothing including swimwear, tops, bottoms, dresses & Accessories. Stylish, comfortable & perfect for summer holidays and tropical getaways.',
        creator: '@stellabaligroup',
        images: [
            {
                url: '../../../public/Assets/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Stella Bali Logo',
            },
        ],
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

const datas = ['/Assets/hero1.jpg', '/Assets/hero3.jpg', '/Assets/hero2.jpg']

const Home = () => {
    return (
        <>
            <header>
                <div className="w-screen h-screen flex flex-col items-center py-32">
                    <SearchBar />
                    <Carousel datas={datas} place="top" />
                </div>
            </header>
            <main className="w-screen py-12 pb-72 overflow-hidden">
                <div className="">
                    <NewArrival />
                    <Collections />
                    <Blogs />
                </div>
                <Carousel datas={datas} place="bottom" />
            </main>
        </>
    )
}

export default Home
