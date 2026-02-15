'use client'

import { useEffect, useState } from 'react'
import Card from './Card'
import { useProduct } from '@/hooks/product'

const ProductsComponent = ({ sort, collections, type }) => {
    const { products } = useProduct()
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if (!Array.isArray(products)) return

        let result = [...products]

        if (sort == 'new-arrivals') {
            result = result
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5)
        }

        if (sort == 'price-low-to-high') {
            result = result.sort((a, b) => a.price - b.price)
        }

        if (sort == 'price-high-to-low') {
            result = result.sort((a, b) => b.price - a.price)
        }

        if (type) {
            result = result.filter(
                product => product.type.toLowerCase() == type.toLowerCase(),
            )
        }

        if (collections) {
            result = result.filter(
                product =>
                    product.subtype.toLowerCase() == collections.toLowerCase(),
            )
        }

        console.log(result)

        setFiltered(result)
    }, [sort, collections, type, products])

    return (
        <section className="w-full flex justify-center flex-wrap gap-4">
            {filtered.length > 0 ? (
                filtered?.map((product, index) => <Card data={product} />)
            ) : (
                <p className="text-center">No Products Available!</p>
            )}
        </section>
    )
}
export default ProductsComponent
