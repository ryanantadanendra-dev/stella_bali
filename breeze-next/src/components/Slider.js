'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useBlog } from '@/hooks/blog'
import Image from 'next/image'
import Link from 'next/link'
// import Loading from '@/app/(site)/blogs/loading'

export default function Slider() {
    const isMobile = useIsMobile(500)
    const { blogs } = useBlog()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setReady(true), 0)
        return () => clearTimeout(t)
    }, [])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        slidesToScroll: 1,
        align: 'center',
    })

    const scrollTo = useCallback(i => emblaApi?.scrollTo(i), [emblaApi])

    const onSelect = useCallback(() => {
        if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    const size = useMemo(() => (isMobile ? 2 : 4), [isMobile])

    const slides = useMemo(() => {
        if (!blogs?.data) return []
        const data = blogs.data.slice(2)
        const res = []
        for (let i = 0; i < data.length; i += size) {
            res.push(data.slice(i, i + size))
        }
        return res
    }, [blogs?.data, size])

    const formatedDate = useCallback(date => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    }, [])

    if (!ready) return null
    if (!blogs) return <p>Loading. . .</p>

    return (
        <div className="w-screen bg-white mt-12">
            <div
                ref={emblaRef}
                key={isMobile ? 'mobile' : 'desktop'}
                className="overflow-hidden">
                <div className="flex">
                    {slides.map((group, i) => (
                        <div key={i} className="flex-[0_0_100%] px-6 md:px-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
                                {group.map(blog => (
                                    <Link
                                        key={blog.slug}
                                        href={`/blog/${blog.slug}`}>
                                        <div className="flex gap-4 w-full">
                                            <figure className="relative min-w-40 h-52 bg-gray-100">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog?.image}`}
                                                    alt={blog.title}
                                                    fill
                                                    loading="lazy"
                                                    sizes="(max-width: 768px) 150px, 200px"
                                                    className="object-cover"
                                                    unoptimized={false}
                                                />
                                            </figure>
                                            <div>
                                                <h3 className="font-semibold text-base md:text-lg">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {formatedDate(
                                                        blog.created_at,
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-400 mt-2 w-32 truncate">
                                                    {blog.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-7 mt-8">
                <button
                    onClick={() => emblaApi?.scrollPrev()}
                    aria-label="Prev">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-4">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                </button>

                <div className="flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`w-3 h-3 rounded-full ${
                                i === selectedIndex
                                    ? 'bg-gray-800'
                                    : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => emblaApi?.scrollNext()}
                    aria-label="Next">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-4">
                        <path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
