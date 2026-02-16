'use client'

import { useMemo, memo } from 'react'
import Card from './Card'
import { useProduct } from '@/hooks/product'
import Loading from '@/app/loading'

// Memoized Card wrapper to prevent unnecessary re-renders
const MemoizedCard = memo(Card)

const ProductsComponent = ({ sort, collections, type }) => {
    const { products, isLoading, isError } = useProduct()

    // Memoize filtered and sorted products
    const filtered = useMemo(() => {
        if (!Array.isArray(products)) return []

        let result = [...products]

        // Apply type filter first (most restrictive)
        if (type) {
            result = result.filter(
                product => product.type?.toLowerCase() === type.toLowerCase(),
            )
        }

        // Apply collections filter
        if (collections) {
            result = result.filter(
                product =>
                    product.subtype?.toLowerCase() ===
                    collections.toLowerCase(),
            )
        }

        // Apply sorting last
        if (sort === 'new-arrivals') {
            result = result
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5)
        } else if (sort === 'price-low-to-high') {
            result = result.sort((a, b) => a.price - b.price)
        } else if (sort === 'price-high-to-low') {
            result = result.sort((a, b) => b.price - a.price)
        }

        return result
    }, [products, sort, collections, type])

    if (isLoading) return <Loading />
    if (isError) return <div>Error loading products</div>

    return (
        <section className="w-full flex justify-center flex-wrap gap-4">
            {filtered.length > 0 ? (
                filtered.map((product, index) => (
                    <MemoizedCard
                        key={product.id || product.slug}
                        data={product}
                        priority={index < 3}
                    />
                ))
            ) : (
                <p className="text-center text-lg mt-10">
                    No Products Available!
                </p>
            )}
        </section>
    )
}

export default ProductsComponent
