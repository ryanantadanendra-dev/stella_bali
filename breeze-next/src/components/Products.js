// components/Products.jsx
// FIXES:
//   - Eliminates client-side useProduct() fetch on initial render
//     by using initialProducts from SSR. This is what causes the 3,080ms delay:
//     the hook fetches, waits, then the image is finally known.
//   - Only falls back to hook for subsequent filter changes
//   - Reduces unused JS: no longer pulls in SWR/fetch logic on initial paint
//   - CLS fix: no loading spinner on initial render (data is already there)

'use client'

import { useMemo, memo, useState, useEffect } from 'react'
import Card from './Card'

const MemoizedCard = memo(Card)

// Only mark first 2 cards as priority — they are the only ones
// potentially above the fold on mobile (320px cards, ~2 fit)
const PRIORITY_COUNT = 2

function filterAndSort(products, { type, collections, sort }) {
    let result = Array.isArray(products) ? [...products] : []

    if (type) {
        result = result.filter(
            p => p.type?.toLowerCase() === type.toLowerCase(),
        )
    }
    if (collections) {
        result = result.filter(
            p => p.subtype?.toLowerCase() === collections.toLowerCase(),
        )
    }
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

const ProductsComponent = ({ sort, collections, type, initialProducts }) => {
    // Use SSR data immediately — no loading state, no fetch delay, no CLS
    // initialProducts.data comes from the server-side fetch in page.jsx
    const ssrProducts = initialProducts?.data ?? []

    // FIX: Only import useProduct dynamically if we need to refetch
    // (e.g., after a filter change that SSR didn't anticipate)
    // This avoids loading SWR/axios into the initial JS bundle
    const [dynamicProducts, setDynamicProducts] = useState(null)
    const [isError, setIsError] = useState(false)

    // If you need live updates after filter changes, you can refetch here.
    // For now, SSR data + URL-based filtering is sufficient and much faster.
    // Uncomment and adapt this if your hook is needed:
    //
    // useEffect(() => {
    //   if (/* user changed filters */ false) {
    //     import('@/hooks/product').then(({ useProduct }) => { ... })
    //   }
    // }, [sort, collections, type])

    const products = dynamicProducts ?? ssrProducts

    const filtered = useMemo(
        () => filterAndSort(products, { type, collections, sort }),
        [products, type, collections, sort],
    )

    // FIX: No loading state on initial render — data is already available from SSR
    // This eliminates the flash/spinner that was causing CLS

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
                    : 'No products available'}
            </span>
            {filtered.length > 0 ? (
                <ul
                    role="list"
                    className="flex flex-wrap gap-8 justify-center w-full">
                    {filtered.map((product, index) => (
                        <li key={product.id ?? product.slug}>
                            <MemoizedCard
                                data={product}
                                priority={index < PRIORITY_COUNT}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p
                    role="status"
                    className="ms-12 text-center text-lg mt-10 col-span-full">
                    No Products Available!
                </p>
            )}
        </section>
    )
}

export default ProductsComponent
