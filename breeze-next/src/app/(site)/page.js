import { Carousel } from '@/components/Carousel'
import Hero1 from '../../../public/Assets/hero1.jpg'
import Hero2 from '../../../public/Assets/hero2.jpg'
import Hero3 from '../../../public/Assets/hero3.jpg'
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
    title: 'Stella Bali | Breathable Beachwear for Everyday Ease',
    description:
        'Feel the Bali breeze in every thread. Stella Bali creates effortless, lightweight clothing designed for tropical living and everyday ease. Shop our island-inspired collection.',
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
        title: 'Stella Bali | Bali Breeze & Everyday Ease',
        description:
            'Effortless, breathable beachwear designed for the tropical soul. Discover lightweight essentials that bring the spirit of Bali to your everyday wardrobe.',
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
        images: [
            {
                url: '../../../public/Assets/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Stella Logo',
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

const datas = [Hero1, Hero2, Hero3]

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
