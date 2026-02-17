'use client'

import { useProduct } from '@/hooks/product'
import Image from 'next/image'
import { useState } from 'react'
import WaButton from './WaButton'

const priceFormat = price => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(price)
}

const Details = ({ slug }) => {
    const { products } = useProduct()
    const [isActive, setIsActive] = useState(0)
    const product = products?.find(product => product.slug == slug)

    return (
        <section className="w-screen flex flex-wrap">
            <div className="md:w-1/2 w-full flex flex-col-reverse md:flex-row h-96 items-center justify-center mt-12 md:mt-0">
                <div className="md:h-[25rem] lg:h-[30rem] h-44 w-96 flex mx-auto gap-5 md:block md:w-1/4 overflow-x-scroll overflow-y-hidden md:overflow-x-hidden md:overflow-y-scroll">
                    {product?.images.map((image, index) => (
                        <figure
                            onClick={() => setIsActive(index)}
                            key={index}
                            className={`md:w-28 md:h-32 min-w-32 h-44 relative mt-5 ${isActive == index ? 'opacity-100' : 'opacity-50'}`}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${image.path}`}
                                alt={`${product?.name} image ${index}`}
                                fill
                                className="object-cover"
                            />
                        </figure>
                    ))}
                </div>
                <figure className="lg:w-[30rem] lg:h-[30rem] md:w-[20rem] md:h-[25rem] w-[20rem] h-[25rem] bg-black relative">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${product?.images[isActive].path}`}
                        fill
                        className="object-cover"
                    />
                </figure>
            </div>
            <div className="md:w-1/2 w-full px-12 md:px-0 md:ps-12">
                <h1 className="text-2xl lg:text-4xl font-bold mt-8 md:mt-0">
                    {product?.name}
                </h1>
                <p className="mt-4">{product?.description}</p>
                <p className="font-bold text-xl lg:text-3xl mt-12">
                    {priceFormat(product?.price)}
                </p>
                <p className="text-xl mt-9">Colors</p>
                <div className="flex gap-2 mt-3">
                    {product?.colors.map((color, index) => (
                        <div
                            key={index}
                            className={`w-7 h-7 border-[1px] border-black rounded-full`}
                            style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <WaButton />
            </div>
        </section>
    )
}
export default Details
