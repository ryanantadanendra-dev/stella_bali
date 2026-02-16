'use client'

import { useProduct } from '@/hooks/product'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Search from './Search'

const SearchBar = () => {
    const { products } = useProduct()
    const [search, setSearch] = useState('')
    const [isActive, setIsActive] = useState(false)
    const searchParams = useSearchParams()
    const barRef = useRef(null)
    const router = useRouter()

    // Auto-focus on search param
    useEffect(() => {
        if (searchParams.get('search') === 'true') {
            barRef.current?.focus()
            router.replace('/', { scroll: false })
        }
    }, [searchParams, router])

    // Memoized filtered results
    const result = useMemo(() => {
        if (!products) return []

        if (!search) {
            return products.slice(0, 7)
        }

        const searchLower = search.toLowerCase()
        return products
            .filter(
                product =>
                    product.name?.toLowerCase().includes(searchLower) ||
                    product.type?.toLowerCase().includes(searchLower) ||
                    product.subtype?.toLowerCase().includes(searchLower),
            )
            .slice(0, 7)
    }, [search, products])

    const handleFocus = () => setIsActive(true)

    const handleBlur = () => {
        // Delay to allow click events on results
        setTimeout(() => {
            setIsActive(false)
            setSearch('')
        }, 200)
    }

    const handleChange = e => setSearch(e.target.value)

    return (
        <div className="relative flex h-10 w-96 justify-around px-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4"
                aria-hidden="true">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
                ref={barRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="text"
                name="product"
                value={search}
                onChange={handleChange}
                className="w-full border-0 border-b-2 border-b-gray-300 focus:border-b-2 focus:border-b-black focus:outline-none focus:ring-0"
                placeholder="Search Product"
                autoComplete="off"
            />
            <Search datas={result} isActive={isActive} />
        </div>
    )
}

export default SearchBar
