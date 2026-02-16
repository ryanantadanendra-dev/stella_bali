'use client'

import { useProduct } from '@/hooks/product'
import Image from 'next/image'
import image from '../../public/Assets/hero1.jpg'

// Grid span configuration
const GRID_SPANS = {
    0: 'md:row-span-2',
    1: 'md:row-span-1',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
    default: 'md:row-span-2',
}

const getGridSpan = index => GRID_SPANS[index] || GRID_SPANS.default

const Wrapper = ({ index, category }) => {
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
            <figcaption className="absolute bottom-0 z-40 flex w-full justify-between px-3 py-2 text-xl font-bold text-white md:text-6xl">
                <span>{category}</span>
                {showSubcategories && (
                    <div className="text-xs md:text-xl">
                        <p>Man</p>
                        <p>Woman</p>
                    </div>
                )}
            </figcaption>
        </figure>
    )
}

const Collections = () => {
    const { categories } = useProduct()

    return (
        <section className="w-screen px-2 py-32 md:px-12">
            <h2 className="text-center text-3xl font-bold md:text-left">
                Product Collections
            </h2>
            <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-1 md:gap-6">
                {categories?.map((category, index) => (
                    <Wrapper key={category} index={index} category={category} />
                ))}
            </div>
        </section>
    )
}

export default Collections
