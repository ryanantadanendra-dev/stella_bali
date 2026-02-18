'use client'

import Link from 'next/link'
import { useProduct } from '@/hooks/product'
import Card from './Card'

const NewArrival = () => {
    const { products } = useProduct()

    const latests = products
        ?.slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 4)
    return (
        <section className="w-full h-full py-32 md:px-12">
            <div className="flex justify-around md:justify-between">
                <h2 className="text-3xl font-bold">New Arrivals</h2>
                <Link href="/products?sort=new-arrivals">View All</Link>
            </div>
            <div className="cards-container flex justify-center flex-wrap gap-12 mt-12">
                {latests?.map((latest, index) => (
                    <Card data={latest} key={latest?.slug} />
                ))}
            </div>
        </section>
    )
}
export default NewArrival
