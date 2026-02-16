// components/Sidebar.jsx (optimized version)
'use client'

import { useEffect, useState, useCallback, useMemo, memo } from 'react'
import { useProduct } from '@/hooks/product'
import { useSearchParams, useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'
import dynamic from 'next/dynamic'

const FilterBtn = dynamic(() => import('./FilterBtn'), { ssr: false })

const TYPES = ['Man', 'Woman']
const SORT_OPTIONS = [
    { id: 'newArrival', value: 'new-arrivals', label: 'New Arrivals' },
    {
        id: 'priceLowToHigh',
        value: 'price-low-to-high',
        label: 'Price: Low To High',
    },
    {
        id: 'priceHighToLow',
        value: 'price-high-to-low',
        label: 'Price: High To Low',
    },
]

// Memoized radio input component
const RadioInput = memo(({ id, value, name, checked, onClick, label }) => (
    <div className="flex gap-2 items-center">
        <input
            onClick={onClick}
            type="radio"
            value={value}
            name={name}
            id={id}
            checked={checked}
            readOnly
            className="opacity-0 absolute peer"
        />
        <label
            htmlFor={id}
            className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59] cursor-pointer flex-shrink-0"
        />
        <label
            htmlFor={id}
            className="text-xs md:text-xl ms-3 cursor-pointer select-none">
            {label}
        </label>
    </div>
))
RadioInput.displayName = 'RadioInput'

const Sidebar = () => {
    const [sortOpen, setSortOpen] = useState(false)
    const [collectionsOpen, setCollectionsOpen] = useState(false)
    const [extendCollection, setExtendCollection] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const isMobile = useIsMobile(500)
    const { categories } = useProduct()
    const searchParams = useSearchParams()
    const router = useRouter()

    const currentFilters = useMemo(
        () => ({
            sort: searchParams.get('sort'),
            type: searchParams.get('type'),
            collections: searchParams.get('collections'),
        }),
        [searchParams],
    )

    const { sort, type, collections } = currentFilters

    useEffect(() => {
        setSortOpen(!!sort)
        setCollectionsOpen(!!type)
        if (type) setExtendCollection(type)
    }, [sort, type])

    const updateURLParams = useCallback(
        (updates = {}, deletions = []) => {
            const params = new URLSearchParams(searchParams.toString())
            deletions.forEach(key => params.delete(key))
            Object.entries(updates).forEach(([key, value]) => {
                value ? params.set(key, value) : params.delete(key)
            })
            const queryString = params.toString()
            router.push(
                queryString ? `/products?${queryString}` : '/products',
                { scroll: false },
            )
        },
        [searchParams, router],
    )

    const handleTypeClick = useCallback(
        value => {
            if (type === value) {
                updateURLParams({}, ['type', 'collections'])
                setExtendCollection('')
            } else {
                updateURLParams({ type: value }, ['collections'])
                setExtendCollection(value)
            }
        },
        [type, updateURLParams],
    )

    const handleCollectionClick = useCallback(
        value => {
            updateURLParams(
                collections === value ? {} : { collections: value },
                collections === value ? ['collections'] : [],
            )
        },
        [collections, updateURLParams],
    )

    const handleSortClick = useCallback(
        value => {
            updateURLParams(
                sort === value ? {} : { sort: value },
                sort === value ? ['sort'] : [],
            )
        },
        [sort, updateURLParams],
    )

    const toggleSort = useCallback(() => {
        const newState = !sortOpen
        setSortOpen(newState)
        if (!newState && sort) updateURLParams({}, ['sort'])
    }, [sortOpen, sort, updateURLParams])

    const toggleCollections = useCallback(() => {
        setCollectionsOpen(prev => !prev)
    }, [])

    // Memoized icon paths
    const plusIcon =
        'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'
    const minusIcon =
        'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z'

    return (
        <>
            {isMobile && (
                <div className="ms-10 mt-32">
                    <FilterBtn setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
            )}

            <aside
                className={`md:min-h-screen h-full shadow-lg shadow-gray-400 md:w-80 bg-white pt-7 top-0 fixed z-30 md:block md:static transition-transform duration-300 ease-out ${
                    !isOpen && isMobile
                        ? '-translate-x-full w-0'
                        : 'translate-x-0 w-32'
                }`}>
                {isMobile && (
                    <div className="flex justify-end pe-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-12 p-2"
                            aria-label="Close filter">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                className="w-3">
                                <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Sort Section */}
                <section
                    className={`w-32 mt-8 md:w-64 transition-all duration-300 bg-white px-3 ${isOpen || !isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={toggleSort}
                        className="flex justify-between items-center w-full h-12"
                        aria-expanded={sortOpen}>
                        <h2 className="text-xs md:text-2xl font-medium">
                            Sort By
                        </h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="md:w-4 w-2">
                            <path d={sortOpen ? minusIcon : plusIcon} />
                        </svg>
                    </button>

                    {sortOpen && (
                        <ul className="md:mt-8 mt-4 space-y-3">
                            {SORT_OPTIONS.map(option => (
                                <li key={option.id}>
                                    <RadioInput
                                        id={option.id}
                                        value={option.value}
                                        name="sort"
                                        checked={sort === option.value}
                                        onClick={() =>
                                            handleSortClick(option.value)
                                        }
                                        label={option.label}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Collections Section */}
                <section
                    className={`w-32 md:w-64 bg-white px-3 ${sortOpen ? 'md:mt-20 mt-8' : 'md:mt-2 mt-4'} ${isOpen || !isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={toggleCollections}
                        className="flex justify-between items-center w-full h-10"
                        aria-expanded={collectionsOpen}>
                        <h2 className="text-xs md:text-2xl font-medium">
                            Collections
                        </h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-2 md:w-4">
                            <path d={collectionsOpen ? minusIcon : plusIcon} />
                        </svg>
                    </button>

                    {collectionsOpen && (
                        <ul className="mt-8 space-y-3">
                            {TYPES.map(typeValue => (
                                <li key={typeValue}>
                                    <RadioInput
                                        id={typeValue}
                                        value={typeValue}
                                        name="type"
                                        checked={type === typeValue}
                                        onClick={() =>
                                            handleTypeClick(typeValue)
                                        }
                                        label={typeValue}
                                    />

                                    {extendCollection === typeValue &&
                                        categories && (
                                            <div className="mt-3 ms-5 space-y-3">
                                                {categories
                                                    .filter(
                                                        cat =>
                                                            typeValue !==
                                                                'Man' ||
                                                            cat !== 'Dresses',
                                                    )
                                                    .map(category => (
                                                        <RadioInput
                                                            key={category}
                                                            id={category}
                                                            value={category}
                                                            name="collections"
                                                            checked={
                                                                collections ===
                                                                category
                                                            }
                                                            onClick={() =>
                                                                handleCollectionClick(
                                                                    category,
                                                                )
                                                            }
                                                            label={category}
                                                        />
                                                    ))}
                                            </div>
                                        )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </aside>
        </>
    )
}

export default memo(Sidebar)
