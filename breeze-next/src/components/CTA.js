'use client'

import Image from 'next/image'
import Link from 'next/link'

const CTA = ({ heading, subheading }) => {
    return (
        <section className="relative mt-32 flex h-96 w-screen flex-col items-center justify-center gap-3 text-white">
            <Image
                src="/Assets/cta.png"
                alt="Call to action background"
                fill
                quality={75}
                sizes="100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgAA8A/9k="
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col items-center gap-3 px-4">
                <h2 className="text-center text-3xl font-bold md:text-5xl">
                    {heading}
                </h2>
                <p className="max-w-2xl text-center text-sm md:text-lg">
                    {subheading}
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/products"
                        className="mt-4 bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105">
                        Shop Now
                    </Link>
                    <Link
                        href="/products"
                        className="mt-4 px-8 py-4 font-bold text-white bg-transparent border-2 border-white transition-transform hover:scale-105">
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CTA
