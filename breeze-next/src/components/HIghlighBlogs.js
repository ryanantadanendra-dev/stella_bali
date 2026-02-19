'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useBlog } from '@/hooks/blog'

export default function HighlightBlogs() {
    const { blogs } = useBlog()

    const highlight = useMemo(() => {
        if (!blogs?.data) return []
        return blogs.data.slice(0, 2)
    }, [blogs])

    if (!highlight.length) return null

    return (
        <div className="blogs-wrapper flex md:flex-row flex-col items-center justify-center gap-3 lg:pt-12 px-6 md:px-20">
            {highlight.map((blog, index) => (
                <Link
                    key={blog.slug}
                    href={`/blog/${blog?.slug}`}
                    aria-label={`Read Blog: ${blog?.title}`}
                    className={`relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 h-56 aspect-[16/9] ${
                        index === 0
                            ? 'lg:w-[37rem] md:w-[30rem] w-96 md:flex-1'
                            : 'lg:w-[20rem] md:w-[15rem] w-96'
                    }`}
                    style={{ backgroundColor: 'var(--color-primary)' }}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog?.image}`}
                        alt=""
                        fill
                        priority={index === 0}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        sizes="(max-width: 768px) 90vw, 400px"
                        unoptimized={false}
                        className="object-cover"
                    />

                    <div className="absolute bottom-0 z-10 w-full h-16 px-5 bg-black/60 flex items-center justify-between gap-2">
                        <h3 className="text-white text-lg md:text-2xl flex-1 truncate">
                            {blog.title}
                        </h3>
                    </div>
                </Link>
            ))}
        </div>
    )
}
