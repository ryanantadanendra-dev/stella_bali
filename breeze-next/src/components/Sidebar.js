// components/Sidebar.jsx
// FIXES:
//   - CLS 0.874 → near 0: The opacity-0 class was being applied during SSR
//     and then flipping to opacity-100 after hydration, causing a massive layout shift.
//     Fix: use CSS visibility instead, or render with correct opacity from the start
//     using a data attribute set before hydration (no-JS-flash pattern).
//   - Accessibility: FilterBtn button has no accessible name (Lighthouse flagged:
//     "main.h-full > div.ms-10 > div.sc-beqWay > button.setting-btn")
//   - Removed extendCollection duplicate state (derived from URL)

'use client'

import { useEffect, useState, useCallback, useMemo, memo } from 'react'
import { useProduct } from '@/hooks/product'
import { useSearchParams, useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'
import dynamic from 'next/dynamic'

// FIX: FilterBtn — this component is 84 KiB which is far too large for a button.
// Check what it's importing. If it pulls in a UI library, replace with a simple button.
// The ssr:false is correct here since it reads window size.
const FilterBtn = dynamic(() => import('./FilterBtn'), {
    ssr: false,
    // FIX: Provide a server-rendered placeholder so layout doesn't shift
    // when FilterBtn hydrates
    loading: () => (
        <button
            className="setting-btn"
            aria-label="Open filters"
            aria-expanded="false"
            disabled>
            <span className="sr-only">Open filters</span>
        </button>
    ),
})

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

// Module-level SVG paths — not recreated on render
const PLUS_ICON =
    'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'
const MINUS_ICON =
    'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z'
const CLOSE_ICON =
    'M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z'

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
    const [isOpen, setIsOpen] = useState(false)
    // FIX: Track hydration to avoid opacity-0 CLS flash
    const [hydrated, setHydrated] = useState(false)

    const isMobile = useIsMobile(500)
    const { categories } = useProduct()
    const searchParams = useSearchParams()
    const router = useRouter()

    // FIX: Mark as hydrated after mount — prevents SSR/client mismatch
    // that was causing the opacity-0 → opacity-100 layout shift (CLS 0.874)
    useEffect(() => {
        setHydrated(true)
    }, [])

    const currentFilters = useMemo(
        () => ({
            sort: searchParams.get('sort'),
            type: searchParams.get('type'),
            collections: searchParams.get('collections'),
        }),
        [searchParams],
    )

    const { sort, type, collections } = currentFilters

    // Derive extendCollection from URL — no duplicate state
    const extendCollection = type ?? ''

    useEffect(() => {
        setSortOpen(!!sort)
        setCollectionsOpen(!!type)
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
            } else {
                updateURLParams({ type: value }, ['collections'])
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

    // FIX: The original code used `opacity-0` during SSR which caused CLS.
    // Instead, render sections with full opacity always, and only control
    // mobile visibility via translate (which doesn't cause layout shift).
    // The sections are always in the DOM with opacity-100.
    const sectionVisible = hydrated ? isOpen || !isMobile : true

    return (
        <>
            {isMobile && (
                <div className="ms-10 mt-0">
                    {/*
                        FIX: FilterBtn must receive aria-label.
                        Lighthouse flagged: "button.setting-btn has no accessible name"
                        Pass aria-label and aria-expanded through to the button element.
                    */}
                    <FilterBtn
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        aria-label={isOpen ? 'Close filters' : 'Open filters'}
                    />
                </div>
            )}

            <aside
                aria-label="Product filters"
                // FIX: Use translate for mobile show/hide, not opacity.
                // Opacity changes cause layout shifts; translate does not.
                // Also: `w-0` was causing the sidebar to collapse which shifts content.
                className={`md:min-h-screen h-full shadow-lg shadow-gray-400 md:w-80 bg-white pt-7 top-0 fixed z-30 md:block md:static transition-transform duration-300 ease-out ${
                    !isOpen && isMobile && hydrated
                        ? '-translate-x-full'
                        : 'translate-x-0'
                } w-32 md:w-auto`}>
                {isMobile && (
                    <div className="flex justify-end pe-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-12 p-2"
                            aria-label="Close filters">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                className="w-3"
                                aria-hidden="true">
                                <path d={CLOSE_ICON} />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Sort Section */}
                {/*
                    FIX: Removed opacity-0/opacity-100 toggle — this was the CLS culprit.
                    The "Sort By" section was listed explicitly as a layout shift source.
                    Content is always visible; mobile hides the whole sidebar via translate.
                */}
                <section className="w-32 mt-8 md:w-64 transition-all duration-300 bg-white px-3">
                    <button
                        onClick={toggleSort}
                        className="flex justify-between items-center w-full h-12"
                        aria-expanded={sortOpen}
                        aria-label={
                            sortOpen
                                ? 'Collapse sort options'
                                : 'Expand sort options'
                        }>
                        <h2 className="text-xs md:text-2xl font-medium">
                            Sort By
                        </h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="md:w-4 w-2"
                            aria-hidden="true">
                            <path d={sortOpen ? MINUS_ICON : PLUS_ICON} />
                        </svg>
                    </button>

                    {sortOpen && (
                        <ul
                            className="md:mt-8 mt-4 space-y-3"
                            role="radiogroup"
                            aria-label="Sort options">
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
                    className={`w-32 md:w-64 bg-white px-3 ${
                        sortOpen ? 'md:mt-20 mt-8' : 'md:mt-2 mt-4'
                    }`}>
                    <button
                        onClick={toggleCollections}
                        className="flex justify-between items-center w-full h-10"
                        aria-expanded={collectionsOpen}
                        aria-label={
                            collectionsOpen
                                ? 'Collapse collections'
                                : 'Expand collections'
                        }>
                        <h2 className="text-xs md:text-2xl font-medium">
                            Collections
                        </h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-2 md:w-4"
                            aria-hidden="true">
                            <path
                                d={collectionsOpen ? MINUS_ICON : PLUS_ICON}
                            />
                        </svg>
                    </button>

                    {collectionsOpen && (
                        <ul
                            className="mt-8 space-y-3"
                            role="radiogroup"
                            aria-label="Collection types">
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
                                            <div
                                                className="mt-3 ms-5 space-y-3"
                                                role="radiogroup"
                                                aria-label={`${typeValue} categories`}>
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
