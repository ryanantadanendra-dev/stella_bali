'use client'

import { useProduct } from '@/hooks/product'
import Image from 'next/image'
import { useState } from 'react'

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
            <div className="md:w-1/2 w-full flex h-96 justify-center">
                <div className="h-full w-1/4 overflow-y-scroll">
                    {product?.images.map((image, index) => (
                        <figure
                            onClick={() => setIsActive(index)}
                            key={index}
                            className={`w-28 h-32 relative mt-5 ${isActive == index ? 'opacity-100' : 'opacity-50'}`}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${image.path}`}
                                alt={`${product?.name} image ${index}`}
                                fill
                                className="object-cover"
                            />
                        </figure>
                    ))}
                </div>
                <figure className="w-80 h-full bg-black relative">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${product?.images[isActive].path}`}
                        fill
                        className="object-cover"
                    />
                </figure>
            </div>
            <div className="md:w-1/2 w-full px-12 md:px-0">
                <h1 className="text-2xl font-bold mt-8 md:mt-0">
                    {product?.name}
                </h1>
                <p className="mt-4">{product?.description}</p>
                <p className="font-bold text-2xl mt-12">
                    {priceFormat(product?.price)}
                </p>
                <p className=" mt-9">Colors</p>
                <div className="flex gap-2">
                    {product?.colors.map((color, index) => (
                        <div
                            key={index}
                            className={`w-7 h-7 border-[1px] border-black rounded-full`}
                            style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <button className="mt-9">Whatsapp</button>
            </div>
        </section>
    )
}
export default Details
