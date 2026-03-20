'use client'

import { useProduct } from '@/hooks/product'
import Image from 'next/image'
import Link from 'next/link'
import Img1 from '@/../public/Assets/tops2.jpg'
import Img2 from '@/../public/Assets/bottoms3.jpg'
import Img3 from '@/../public/Assets/swimsuits.jpg'
import Img4 from '@/../public/Assets/dresses2.jpg'
import Img5 from '@/../public/Assets/accesories.jpg'

// Grid span configuration
const GRID_SPANS = {
    0: 'md:row-span-2',
    1: 'md:row-span-2',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
    default: 'md:row-span-1',
}

const getGridSpan = index => GRID_SPANS[index] || GRID_SPANS.default

const Wrapper = ({ index, category, image, dict }) => {
    const showSubcategories = index !== 3

    return (
        <figure
            className={`wrapper relative overflow-hidden rounded-2xl bg-white ${getGridSpan(index)}`}>
            <Image
                src={image}
                alt={category}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="overlay absolute inset-0 z-30" />
            <figcaption className="absolute bottom-0 z-40 flex w-full justify-between px-3 py-2 text-xl text-white md:text-6xl">
                <span className="lg:text-5xl md:text-4xl text-lg">
                    {dict?.home?.collectionsList[index]}
                </span>
                {showSubcategories ? (
                    <div className="text-xs md:text-xl">
                        <Link
                            href={`/products?type=Man&collections=${category}`}
                            className="block">
                            {dict?.home?.gender[0]}
                        </Link>
                        <Link
                            href={`/products?type=Woman&collections=${category}`}
                            className="block">
                            {dict?.home?.gender[1]}
                        </Link>
                    </div>
                ) : (
                    <div className="text-xs md:text-xl">
                        <Link
                            href={`/products?type=Woman&collections=${category}`}
                            className="block">
                            {dict?.home?.gender[1]}
                        </Link>
                    </div>
                )}
            </figcaption>
        </figure>
    )
}

const Collections = ({ dict }) => {
    const images = [Img1, Img2, Img3, Img4, Img5]

    return (
        <section className="w-screen px-2 pb-12 pt-32 md:px-12">
            <h2 className="text-center text-2xl md:text-3xl font-bold md:text-left">
                {dict?.home?.collections}
            </h2>
            <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-1 md:gap-6">
                {dict?.home?.collectionsList.map((category, index) => (
                    <Wrapper
                        key={category}
                        index={index}
                        category={category}
                        image={images[index]}
                        dict={dict}
                    />
                ))}
            </div>
        </section>
    )
}

export default Collections
