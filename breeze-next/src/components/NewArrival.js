'use client'

import Link from 'next/link'
import { useProduct } from '@/hooks/product'
import Card from './Card'
import { useRef } from 'react'

const NewArrival = () => {
    const { products } = useProduct()
    const scrollRef = useRef(null)

    const scroll = direction => {
        const container = scrollRef.current
        const scrollAmount = 320

        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        })
    }

    const latests = products
        ?.slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 4)
    return (
        <section className="w-full h-full pt-20">
            <div className="flex justify-around md:justify-between md:px-12">
                <h2 className="text-3xl font-bold">New Arrivals</h2>
                <Link href="/products?sort=new-arrivals">View All</Link>
            </div>
            <div className="relative mt-12 md:ms-12">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4
                   bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center
                   hover:bg-gray-100 transition"
                    aria-label="Scroll left">
                    ‹
                </button>
                <div
                    ref={scrollRef}
                    className="flex flex-nowrap gap-10 overflow-x-auto overflow-y-hidden scroll-smooth
                   scrollbar-hide px-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {latests?.map(latest => (
                        <Card data={latest} key={latest?.slug} />
                    ))}
                </div>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-12 top-1/2 -translate-y-1/2 z-10 translate-x-4
                   bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center
                   hover:bg-gray-100 transition"
                    aria-label="Scroll right">
                    ›
                </button>
            </div>
        </section>
    )
}
export default NewArrival
