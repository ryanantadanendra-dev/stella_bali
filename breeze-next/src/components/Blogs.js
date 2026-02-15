'use client'

import { useBlog } from '@/hooks/blog'
import Card from './Card'

const Blogs = () => {
    const { blogs } = useBlog()

    const latests = blogs?.data
        ?.slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 4)

    return (
        <section className="w-full h-full py-32">
            <h2 className="text-center text-3xl font-bold">News & Articles</h2>
            <p className="text-center lg:px-[30rem] md:px-12 px-8 text-xs md:text-lg mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
            </p>
            <div className="flex justify-center flex-wrap mt-8 gap-4 md:gap-12">
                {latests?.map((blog, index) => (
                    <Card key={index} data={blog} />
                ))}
            </div>
        </section>
    )
}
export default Blogs
