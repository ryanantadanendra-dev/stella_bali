'use client'

import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export function Carousel({ datas, place }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 6000 }),
    ])

    useEffect(() => {
        if (!emblaApi) return

        const updateFade = () => {
            emblaApi.slideNodes().forEach((slide, index) => {
                slide.classList.toggle(
                    'is-selected',
                    index === emblaApi.selectedScrollSnap(),
                )
            })
        }

        emblaApi.on('select', updateFade)
        emblaApi.on('init', updateFade)
        updateFade()
    }, [emblaApi])

    return (
        <div className="embla mt-12 relative">
            <div
                className={`embla__viewport mx-auto w-full ${place == 'top' ? 'min-h-[75vh]' : 'min-h-[90vh]'}  overflow-hidden ${place == 'top' ? 'lg:px-12' : ''}`}
                ref={emblaRef}>
                <div className="embla__container flex h-full w-full ">
                    {datas?.map((data, index) => (
                        <div
                            key={index}
                            className="embla__slide relative flex-[0_0_100%] w-full h-full">
                            <figure className="absolute inset-0 z-0">
                                <Image
                                    src={data}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </figure>

                            <div className="absolute inset-0 z-10 overlay" />

                            <div
                                className={`absolute inset-0 z-20 flex items-center ${place == 'top' ? '' : 'flex-col justify-center'} px-4 pb-8`}>
                                {place == 'top' ? (
                                    <h1
                                        className={`text-white text-5xl md:text-6xl font-semibold leading-tight mt-auto`}>
                                        Bali Breeze Everyday Ease
                                    </h1>
                                ) : (
                                    <>
                                        <h2
                                            className={`text-white text-5xl md:text-6xl font-semibold leading-tight `}>
                                            Learn About Us
                                        </h2>
                                        <p className="text-lg">
                                            Lorem ipsum dolor sit amet
                                            consectetur.
                                        </p>
                                        <button></button>
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
