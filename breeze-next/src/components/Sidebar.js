'use client'

import { useEffect, useState } from 'react'
import { useProduct } from '@/hooks/product'
import { useSearchParams, useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'
import FilterBtn from './FilterBtn'

const TYPES = ['Man', 'Woman']

const Sidebar = ({ onChange }) => {
    const [sortOpen, setSortOpen] = useState(false)
    const [collectionsOpen, setCollectionsOpen] = useState(false)
    const [extendCollection, setExtendCollection] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const isMobile = useIsMobile(500)
    const { categories } = useProduct()
    const searchParams = useSearchParams()
    const router = useRouter()

    const sort = searchParams.get('sort')
    const type = searchParams.get('type')
    const collections = searchParams.get('collections')

    // Sync state with URL params
    useEffect(() => {
        setSortOpen(!!sort)
        setCollectionsOpen(!!type)

        if (type) {
            setExtendCollection(type)
        }
    }, [sort, type, collections])

    // Generic URL param update handler
    const updateURLParams = (updates = {}, deletions = []) => {
        const params = new URLSearchParams(searchParams.toString())

        // Apply deletions
        deletions.forEach(key => params.delete(key))

        // Apply updates
        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        const queryString = params.toString()
        router.push(queryString ? `/products?${queryString}` : '/products')
    }

    // Handle type click (Man/Woman)
    const handleTypeClick = value => {
        const currentType = searchParams.get('type')

        if (currentType === value) {
            // Uncheck: remove type and collections
            updateURLParams({}, ['type', 'collections'])
            setExtendCollection('')
        } else {
            // Change type: remove collections and set new type
            updateURLParams({ type: value }, ['collections'])
            setExtendCollection(value)
        }
    }

    // Handle collection click
    const handleCollectionClick = value => {
        const currentCollection = searchParams.get('collections')

        if (currentCollection === value) {
            // Uncheck
            updateURLParams({}, ['collections'])
        } else {
            // Check
            updateURLParams({ collections: value })
        }
    }

    // Handle sort click
    const handleSortClick = value => {
        const currentSort = searchParams.get('sort')

        if (currentSort === value) {
            // Uncheck
            updateURLParams({}, ['sort'])
        } else {
            // Check
            updateURLParams({ sort: value })
        }
    }

    // Toggle sort section
    const toggleSort = () => {
        const newState = !sortOpen
        setSortOpen(newState)

        if (!newState && sort) {
            updateURLParams({}, ['sort'])
        }
    }

    // Render type and collection items
    const displayCollections = TYPES.map(typeValue => (
        <li key={typeValue}>
            {/* Type Radio Button */}
            <div className="flex gap-2 mt-3 items-center">
                <input
                    onClick={() => handleTypeClick(typeValue)}
                    type="radio"
                    value={typeValue}
                    name="type"
                    id={typeValue}
                    checked={type === typeValue}
                    readOnly
                    className="opacity-0 absolute peer"
                />
                <label
                    htmlFor={typeValue}
                    className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59] cursor-pointer"
                />
                <label
                    htmlFor={typeValue}
                    className="text-xs md:text-xl ms-3 cursor-pointer">
                    {typeValue}
                </label>
            </div>

            {/* Collection Sub-items */}
            {extendCollection === typeValue &&
                categories?.map(category => (
                    <div key={category} className="mt-3 ms-5 flex">
                        <input
                            onClick={() => handleCollectionClick(category)}
                            type="radio"
                            value={category}
                            name="collections"
                            id={category}
                            checked={collections === category}
                            readOnly
                            className="opacity-0 absolute peer"
                        />
                        <label
                            htmlFor={category}
                            className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59] cursor-pointer"
                        />
                        <label
                            htmlFor={category}
                            className="text-xs md:text-xl ms-3 cursor-pointer">
                            {category}
                        </label>
                    </div>
                ))}
        </li>
    ))

    // Sort options configuration
    const sortOptions = [
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

    return (
        <>
            {isMobile && (
                <div className="ms-10 mt-32">
                    <FilterBtn setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
            )}

            <aside
                className={`md:min-h-screen h-full shadow-lg shadow-gray-400 md:w-80 bg-white pt-7 top-0 fixed z-30 md:block md:static transition-all duration-200 ease-out ${
                    !isOpen && isMobile ? 'invisible w-0' : 'visible w-32'
                }`}>
                {/* Mobile Close Button */}
                {isMobile && (
                    <div className="flex justify-end pe-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-12"
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
                    className={`w-32 mt-8 md:w-64 ${
                        sortOpen ? 'h-44' : 'h-10'
                    } bg-white px-3 ${isOpen || !isMobile ? 'visible' : 'invisible'}`}>
                    <button
                        onClick={toggleSort}
                        className="flex justify-between items-center w-full h-12">
                        <h2 className="text-xs md:text-2xl">Sort By</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="md:w-4 w-2">
                            <path
                                d={
                                    sortOpen
                                        ? 'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z'
                                        : 'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'
                                }
                            />
                        </svg>
                    </button>

                    {sortOpen && (
                        <ul className="md:mt-8 space-y-3">
                            {sortOptions.map(option => (
                                <li
                                    key={option.id}
                                    className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value={option.value}
                                        id={option.id}
                                        checked={sort === option.value}
                                        onClick={() =>
                                            handleSortClick(option.value)
                                        }
                                        readOnly
                                        className="opacity-0 absolute peer"
                                    />
                                    <label
                                        htmlFor={option.id}
                                        className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59] cursor-pointer"
                                    />
                                    <label
                                        htmlFor={option.id}
                                        className="text-xs md:text-xl ms-3 cursor-pointer">
                                        {option.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Collections Section */}
                <section
                    className={`w-32 md:w-64 ${
                        collectionsOpen ? 'h-auto' : 'h-10'
                    } bg-white px-3 ${
                        sortOpen ? 'md:mt-20' : 'md:mt-2'
                    } ${isOpen || !isMobile ? 'visible' : 'invisible'}`}>
                    <button
                        onClick={() => setCollectionsOpen(!collectionsOpen)}
                        className="flex justify-between items-center w-full h-10">
                        <h2 className="text-xs md:text-2xl">Collections</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-2 md:w-4">
                            <path
                                d={
                                    collectionsOpen
                                        ? 'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z'
                                        : 'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'
                                }
                            />
                        </svg>
                    </button>

                    {collectionsOpen && (
                        <ul className="mt-8">{displayCollections}</ul>
                    )}
                </section>
            </aside>
        </>
    )
}

export default Sidebar
