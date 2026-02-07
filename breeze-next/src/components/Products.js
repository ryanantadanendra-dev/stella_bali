'use client'

import { useEffect, useState } from 'react'
import Card from './Card'
import { useProduct } from '@/hooks/product'

const ProductsComponent = ({ sort, collections }) => {
    const { products } = useProduct()
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if (!Array.isArray(products)) return

        let result = [...products]

        if (sort) {
            result.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at),
            )
        }

        if (collections) {
            result = result.filter(product => product.subtype == collections)
        }

        setFiltered(result)
    }, [sort, collections, products])

    return (
        <section className="flex justify-center gap-4">
            {filtered?.map((product, index) => (
                <Card data={product} />
            ))}
        </section>
    )
}
export default ProductsComponent
