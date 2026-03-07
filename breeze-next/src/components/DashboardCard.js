'use client'

import { useProduct } from '@/hooks/product'
import { useBlog } from '@/hooks/blog'
import { useContact } from '@/hooks/useContact'
import Link from 'next/link'

const DashboardCard = ({ title, icon }) => {
    const { products } = useProduct()
    const { blogs } = useBlog()

    return (
        <Link href={`/dashboard/${title.toLowerCase()}`}>
            <div className="w-72 h-44 bg-white shadow-lg shadow-gray-200 text-black py-7 rounded-xl">
                <div className="flex gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4">
                        <path fill="rgb(0, 0, 0)" d={icon} />
                    </svg>
                    <h2>{title}</h2>
                </div>
                <div className="flex h-full justify-center items-center">
                    <p className="text-4xl">
                        {title == 'Products'
                            ? products?.length
                            : title == 'Blogs'
                              ? blogs?.data.length
                              : '1'}
                    </p>
                </div>
            </div>
        </Link>
    )
}
export default DashboardCard
