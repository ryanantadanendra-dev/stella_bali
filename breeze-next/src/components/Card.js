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

const Card = ({ data, priority = false, dict, lang }) => {
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
            router.push(`/product/${data.slug}?lang=${lang}`)
        }
    }

    const title =
        data.name && lang == 'en'
            ? data.name
            : data.name && lang == 'ina'
              ? data.name_ina
              : data.title && lang == 'en'
                ? data.title
                : data.title_ina

    const subtitle = isProduct
        ? priceFormat(data.price)
        : data.subtitle && lang == 'en'
          ? data.subtitle
          : data.subtitle_ina

    return (
        <div
            onKeyDown={e => e.key == 'Enter' && handleClick()}
            tabIndex={0}
            onClick={handleClick}
            className={`flex ${isBlog ? 'md:h-[30rem] md:max-h-[30rem] md:max-w-72 md:w-72 max-w-44 max-h-[16rem] w-64 h-96' : 'md:h-[25rem] min-w-72 max-w-72 h-[18rem] md:min-w-72'} md:min-h-[25rem] max-h-[30rem] flex-col justify-around bg-white px-3 py-2 shadow-lg shadow-gray-300 ${
                isProduct ? 'cursor-pointer transition-transform' : ''
            }`}>
            <figure
                className={`relative ${isBlog ? 'h-32 md:h-56' : 'h-44 md:h-56'}  w-full overflow-hidden`}>
                <Image
                    src={imageSrc}
                    alt=""
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

            <h3
                className={`line-clamp-2 ${isBlog ? 'text-[0.7rem]' : 'text-[0.9rem]'}  md:text-lg font-semibold`}>
                {title}
            </h3>

            <p
                className={
                    isProduct
                        ? 'font-bold truncate text-xs md:text-lg'
                        : 'font-normal truncate text-[0.6rem]'
                }>
                {subtitle}
            </p>

            {data.description && (
                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            lang == 'en'
                                ? data?.description
                                : data?.description_ina,
                    }}
                    className="line-clamp-2 text-[0.5rem] md:text-lg"
                />
            )}

            {isBlog && (
                <Link
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    href={`/blog/${data.slug || ''}`}
                    className="flex px-1 md:px-0 md:h-10 md:w-48 w-32 h-8 text-[0.5rem] md:text-xs items-center justify-around gap-3 rounded-full border-2 border-black transition-colors hover:bg-black hover:text-white"
                    aria-label={`Read more about ${title}`}>
                    {dict?.home.aboutBtn}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-2 md:w-3 rotate-45"
                        aria-hidden="true">
                        <path
                            fill={isHovered ? '#FFFFFF' : '#000000'}
                            d="M214.6 17.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 117.3 160 488c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                        />
                    </svg>
                </Link>
            )}
        </div>
    )
}

export default memo(Card)
