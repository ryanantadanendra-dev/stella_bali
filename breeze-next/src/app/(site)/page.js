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
    title: 'Laravel',
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
