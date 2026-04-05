'use client'

import { useMemo, memo, useState, useEffect } from 'react'
import Card from './Card'

const MemoizedCard = memo(Card)

const PRIORITY_COUNT = 2

function filterAndSort(products, { type, collections, sort }) {
    let result = Array.isArray(products) ? [...products] : []

    if (sort === 'new-arrivals') {
        result = result
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 10)
    } else if (sort === 'price-low-to-high') {
        result = result.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-high-to-low') {
        result = result.sort((a, b) => b.price - a.price)
    }

    return result
}

const ProductsComponent = ({
    sort,
    collections,
    type,
    initialProducts,
    dict,
    lang,
}) => {
    const ssrProducts = Array.isArray(initialProducts)
        ? initialProducts
        : initialProducts?.data ?? []

    const [isError, setIsError] = useState(false)

    const filtered = useMemo(
        () => filterAndSort(ssrProducts, { sort }),
        [ssrProducts, sort],
    )

    if (isError) {
        return (
            <p className="text-center text-lg mt-10 text-red-500" role="alert">
                Failed to load products. Please try again.
            </p>
        )
    }

    return (
        <section
            className="w-full flex justify-center flex-wrap gap-8 py-4 md:ps-12"
            aria-label="Product list">
            <span aria-live="polite" aria-atomic="true" className="sr-only">
                {filtered.length > 0
                    ? `${filtered.length} products found`
                    : dict?.noprodproduct?.noproduct}
            </span>
            {filtered?.length > 0 ? (
                <ul
                    role="list"
                    className="flex flex-wrap gap-1 md:gap-8 justify-center lg:justify-start w-full">
                    {filtered.map((product, index) => (
                        <li key={product.id ?? product.slug}>
                            <MemoizedCard
                                data={product}
                                priority={index < PRIORITY_COUNT}
                                dict={dict}
                                lang={lang}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p
                    role="status"
                    className="text-center text-lg mt-10 col-span-full">
                    {dict?.product?.noprod}
                </p>
            )}
        </section>
    )
}

export default ProductsComponent
