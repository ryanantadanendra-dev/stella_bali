'use client'

import { useBlog } from '@/hooks/blog'
import { useMemo } from 'react'
import Card from './Card'

const Blogs = () => {
    const { blogs } = useBlog()

    // Memoize sorted and sliced blogs
    const latestBlogs = useMemo(() => {
        if (!blogs?.data) return []

        return [...blogs.data]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4)
    }, [blogs?.data])

    return (
        <section className="w-full h-full py-32">
            <h2 className="text-center text-3xl font-bold">News & Articles</h2>
            <p className="text-center lg:px-[29rem] md:px-0 px-8 text-xs md:text-[1.3rem] mt-3 leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-center flex-wrap mt-8 gap-4 md:gap-12">
                {latestBlogs.map(blog => (
                    <Card key={blog.id || blog.slug} data={blog} />
                ))}
            </div>
        </section>
    )
}

export default Blogs
