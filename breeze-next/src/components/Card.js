'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, memo, useState } from 'react'

const priceFormat = price => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Remove decimals for cleaner display
    }).format(price)
}

const Card = ({ data, priority = false }) => {
    const router = useRouter()

    const isProduct = Boolean(data?.name)
    const isBlog = Boolean(data?.title)
    const [isHovered, setIsHovered] = useState(false)

    const imageSrc = useMemo(() => {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        if (data?.images?.length > 0) {
            return `${baseUrl}/storage/${data.images[0].path}`
        }
        if (data?.image) {
            return `${baseUrl}/storage/${data.image}`
        }
        return '/placeholder.jpg'
    }, [data?.images, data?.image])

    const handleClick = () => {
        if (isProduct && data?.slug) {
            router.push(`/product/${data.slug}`)
        }
    }

    const title = data.name || data.title || 'Untitled'
    const subtitle = isProduct ? priceFormat(data.price) : data.subtitle

    return (
        <article
            onClick={handleClick}
            className={`flex ${isBlog ? 'h-[30rem] max-h-[30rem]' : 'h-[25rem]'}  w-72 min-h-[25rem] max-h-[30rem] flex-col justify-around bg-white px-3 py-2 shadow-lg shadow-gray-300 ${
                isProduct
                    ? 'cursor-pointer transition-transform hover:scale-105'
                    : ''
            }`}>
            <figure className="relative h-56 w-full overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    quality={50}
                    priority={priority}
                    loading={priority ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgAA8A/9k="
                />
            </figure>

            <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>

            <p
                className={
                    isProduct ? 'font-bold truncate' : 'font-normal truncate'
                }>
                {subtitle}
            </p>

            {data.description && (
                <p className="line-clamp-3 text-sm text-gray-600">
                    {data.description}
                </p>
            )}

            {isBlog && (
                <Link
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    href={`/blog/${data.slug || ''}`}
                    className="flex h-10 w-36 text-xs items-center justify-center gap-3 rounded-full border-2 border-black transition-colors hover:bg-black hover:text-white"
                    aria-label={`Read more about ${title}`}>
                    Learn More
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-3 rotate-45"
                        aria-hidden="true">
                        <path
                            fill={isHovered ? '#FFFFFF' : '#000000'}
                            d="M214.6 17.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 117.3 160 488c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                        />
                    </svg>
                </Link>
            )}
        </article>
    )
}

export default memo(Card)
