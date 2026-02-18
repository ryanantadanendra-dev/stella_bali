'use client'

import Image from 'next/image'

const Hero = ({ title }) => {
    return (
        <header className="relative flex h-72 w-screen flex-col items-center justify-center gap-3 pt-12 text-white md:h-80">
            <Image
                src="/Assets/hero.png"
                alt={`${title} hero background`}
                fill
                priority
                quality={75}
                sizes="100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgAA8A/9k="
            />
            <div className="absolute inset-0 bg-black/40" />
            <h1 className="relative z-10 text-4xl font-bold md:text-5xl">
                {title}
            </h1>
            <p className="text-white z-10 text-center text-[1rem]">
                About Bali's Spirit meets contemporary summer style
            </p>
        </header>
    )
}

export default Hero
