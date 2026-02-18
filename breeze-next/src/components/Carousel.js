'use client'

import { useEffect, useCallback, useMemo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'

export function Carousel({ datas, place }) {
    // Memoize autoplay plugin to prevent recreation
    const autoplayPlugin = useMemo(() => [Autoplay({ delay: 6000 })], [])

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        autoplayPlugin,
    )

    // Memoize fade update function
    const updateFade = useCallback(() => {
        if (!emblaApi) return

        const selectedIndex = emblaApi.selectedScrollSnap()
        emblaApi.slideNodes().forEach((slide, index) => {
            slide.classList.toggle('is-selected', index === selectedIndex)
        })
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on('select', updateFade)
        emblaApi.on('init', updateFade)
        updateFade()

        // Cleanup
        return () => {
            emblaApi.off('select', updateFade)
            emblaApi.off('init', updateFade)
        }
    }, [emblaApi, updateFade])

    // Determine if this is a top placement
    const isTopPlacement = place === 'top'

    return (
        <div className="embla relative mt-12">
            <div
                className={`embla__viewport mx-auto min-h-[75vh] w-full overflow-hidden ${
                    isTopPlacement ? 'lg:px-12' : ''
                }`}
                ref={emblaRef}>
                <div className="embla__container flex h-full w-full">
                    {datas?.map((data, index) => (
                        <div
                            key={`${data}-${index}`}
                            className="embla__slide relative h-full w-full flex-[0_0_100%]">
                            <figure className="absolute inset-0 z-0">
                                <Image
                                    src={data}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    quality={index === 0 ? 85 : 75}
                                    sizes="100vw"
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                />
                            </figure>

                            <div className="overlay absolute inset-0 z-10" />

                            <div
                                className={`absolute inset-0 z-20 flex items-center px-4 pb-8 ${
                                    isTopPlacement
                                        ? ''
                                        : 'flex-col justify-center'
                                }`}>
                                {isTopPlacement ? (
                                    <h1 className="mt-auto text-4xl font-semibold leading-tight text-white md:text-6xl">
                                        Bali Breeze Everyday Ease
                                    </h1>
                                ) : (
                                    <>
                                        <h2 className="text-center text-4xl font-semibold leading-tight text-white md:text-6xl">
                                            Learn About Us
                                        </h2>
                                        <p className="text-center text-lg text-white">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </p>
                                        <Link
                                            href="/about"
                                            className="mt-5 bg-white px-8 py-5 text-lg font-bold text-black transition-opacity hover:opacity-90"
                                            aria-label="Learn more about us">
                                            Learn Here
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
