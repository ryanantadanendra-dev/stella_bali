'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const priceFormat = price => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(price)
}

const Card = ({ data }) => {
    const router = useRouter()

    return (
        <div
            onClick={() =>
                data.name ? router.push(`/product/${data?.slug}`) : null
            }
            className={`w-64 ${data.name ? 'h-96 cursor-pointer' : 'h-[30rem]'}  bg-white shadow-lg shadow-gray-300 px-3 py-2 flex flex-col justify-around`}>
            <figure className="w-full h-56 relative">
                <Image
                    src={
                        data?.images?.length
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.images[0].path}`
                            : data?.image
                              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.image}`
                              : ''
                    }
                    fill
                    className="object-cover"
                />
            </figure>
            <h3>{data.name ? data.name : data.title}</h3>
            <p className={`${data.price ? 'font-bold}' : 'font-regular'}`}>
                {data.price ? priceFormat(data.price) : data.subtitle}
            </p>
            {data.description ?? <p>{data.description}</p>}
            {data.title ? (
                <Link
                    href=""
                    className="border-2 border-black w-36 h-10 rounded-full flex items-center justify-center gap-3">
                    Learn More
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-3 rotate-45">
                        <path d="M214.6 17.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 117.3 160 488c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>
                </Link>
            ) : null}
        </div>
    )
}
export default Card
