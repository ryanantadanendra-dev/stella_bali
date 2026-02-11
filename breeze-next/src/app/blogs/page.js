import Hero from '@/components/Hero'
import Slider from '@/components/Slider'
import HighlightBlogs from '@/components/HIghlighBlogs'

const Blogs = () => {
    return (
        <>
            <header>
                <Hero title="News & Article" />
            </header>
            <main className="w-full min-h-screen">
                <HighlightBlogs />
                <Slider />
            </main>
        </>
    )
}
export default Blogs
