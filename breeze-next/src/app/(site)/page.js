import { Carousel } from '@/components/Carousel'
import SearchBar from '@/components/SearchBar'
import NewArrival from '@/components/NewArrival'
import dynamic from 'next/dynamic'
import { getDictionary } from '@/lib/getDictionary'

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

const datas = ['/Assets/hero1.jpg', '/Assets/hero2.jpg', '/Assets/hero3.jpg']

const Home = async ({ searchParams }) => {
    const params = await searchParams
    const lang = params?.lang || 'en'
    const dict = await getDictionary(lang)

    return (
        <>
            <header>
                <div className="w-screen h-screen flex flex-col items-center py-32">
                    <SearchBar dict={dict} />
                    <Carousel datas={datas} place="top" dict={dict} />
                </div>
            </header>
            <main className="w-screen py-12 overflow-hidden">
                <div className="">
                    <NewArrival dict={dict} lang={lang} />
                    <Collections dict={dict} />
                    <Blogs dict={dict} lang={lang} />
                </div>
                <div className="h-[27rem] md:h-[40rem] lg:h-[27rem]">
                    <Carousel
                        datas={datas}
                        place="bottom"
                        dict={dict}
                        lang={lang}
                    />
                </div>
            </main>
        </>
    )
}

export default Home
