'use client'

import { useBlog } from '@/hooks/blog'
import { useMemo } from 'react'
import Card from './Card'

const Blogs = ({ dict, lang }) => {
    const { blogs } = useBlog()

    // Memoize sorted and sliced blogs
    const latestBlogs = useMemo(() => {
        if (!blogs?.data) return []

        return [...blogs.data]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4)
    }, [blogs?.data])

    return (
        <section className="w-full h-full py-12">
            <h2 className="text-center text-2xl md:text-3xl font-bold">
                {dict?.home?.blogs}
            </h2>
            <p className="text-center lg:px-[20rem] md:px-32 px-8 text-xs md:text-[1rem] mt-3 leading-6">
                {dict?.home?.blogsSub}
            </p>
            <div className="flex justify-center flex-wrap mt-8 gap-4 md:gap-12">
                {latestBlogs.length > 0 ? (
                    latestBlogs.map(blog => (
                        <Card
                            key={blog.id || blog.slug}
                            data={blog}
                            lang={lang}
                            dict={dict}
                        />
                    ))
                ) : (
                    <p>{dict?.noblog}!</p>
                )}
            </div>
        </section>
    )
}

export default Blogs
