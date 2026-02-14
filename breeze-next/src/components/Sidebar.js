'use client'

import { useEffect, useState } from 'react'
import { useProduct } from '@/hooks/product'
import { useSearchParams, useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'
import FilterBtn from './FilterBtn'

const types = ['Man', 'Woman']

const Sidebar = ({ onChange }) => {
    const [buttonName, setButtonName] = useState('')
    const [sortOpen, setSortOpen] = useState(false)
    const [collectionsOpen, setCollectionsOpen] = useState(false)
    const [extendCollection, setExtendCollection] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useIsMobile(500)
    const { categories } = useProduct()
    const searchParams = useSearchParams()
    const router = useRouter()
    const sort = searchParams.get('sort')
    const [checked, setChecked] = useState('')
    const [formData, setFormData] = useState({
        sort: '',
        collections: '',
        type: '',
    })

    const handleChange = (name, value) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        router.push(`?${params.toString()}`)
    }

    useEffect(() => {
        if (sort) {
            handleChange('sort', sort)
            setSortOpen(true)
        }
    }, [sort, searchParams])

    const handleClick = (type, value) => {
        if (type == 'type') {
            handleChange('collections', '')
        }

        if (checked == value) {
            setChecked(null)
            router.push('/products')
        } else {
            setChecked(value)
            handleChange(type, value)
            router.push(`/products?${type}=${value}`)
        }
        // setChecked(prev => (prev === value ? '' : value))
    }

    const displayCollections = types.map(type => (
        <>
            <li className="flex gap-2 mt-3 items-center">
                <input
                    checked={checked === type}
                    onClick={e => {
                        handleClick('type', e.target.value)
                        if (checked === e.target.value) {
                            setExtendCollection(false)
                        } else {
                            setExtendCollection(type)
                        }
                    }}
                    type="radio"
                    value={type}
                    name="type"
                    id={type}
                    className={`opacity-0 absolute peer`}
                />
                <label
                    htmlFor={type}
                    className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59]"></label>
                <label htmlFor={type} className="text-xs md:text-xl ms-3">
                    {type}
                </label>
            </li>
            {extendCollection == type
                ? categories?.map((category, index) => (
                      <li key={index} className="mt-3 ms-5 flex">
                          <input
                              onClick={e => {
                                  handleChange('collections', e.target.value)
                              }}
                              type="radio"
                              value={category}
                              name="collections"
                              id={category}
                              className="opacity-0 absolute peer"
                          />
                          <label
                              htmlFor={category}
                              className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59]"></label>
                          <label
                              htmlFor={category}
                              className="text-xs md:text-xl ms-3">
                              {category}
                          </label>
                      </li>
                  ))
                : null}
        </>
    ))

    return (
        <>
            {isMobile ? (
                <div className="ms-10 mt-32">
                    <FilterBtn setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
            ) : null}
            <div
                className={`md:min-h-screen h-full shadow-lg shadow-gray-400 md:w-56 bg-white pt-7 top-0 fixed z-30 md:block md:static transition-all duration-200 ease-out ${!isOpen && isMobile ? 'invisible w-0' : 'visible w-32'}`}>
                {isMobile ? (
                    <div className="flex justify-end pe-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-12">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                className="w-3">
                                <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z" />
                            </svg>
                        </button>
                    </div>
                ) : null}
                <div
                    className={`w-32 mt-8 md:w-52 md:visible ${sortOpen ? 'h-44' : 'h-10'}  bg-white md:pt-0 px-3 ${isOpen ? 'visible' : 'invisible'}`}>
                    <div className="flex justify-between items-center w-full h-12">
                        <p className="text-xs md:text-2xl font-bold">Sort By</p>
                        <svg
                            onClick={() => {
                                setSortOpen(!sortOpen)
                                if (sortOpen) {
                                    router.push('/products')
                                }
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="md:w-4 w-2">
                            <path
                                d={`${sortOpen ? 'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z' : 'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'}`}
                            />
                        </svg>
                    </div>
                    {sortOpen && (
                        <form className="md:mt-8">
                            <ul>
                                <li className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="new-arrivals"
                                        id="newArrival"
                                        checked={checked === 'new-arrivals'}
                                        onClick={e =>
                                            handleClick('sort', e.target.value)
                                        }
                                        className="opacity-0 absolute peer"
                                    />
                                    <label
                                        htmlFor="newArrival"
                                        className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59]"></label>
                                    <label
                                        htmlFor="newArrival"
                                        className="text-xs md:text-xl ms-3">
                                        New Arrivals
                                    </label>
                                </li>
                                <li className="mt-3 flex items-center">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="price-low-to-high"
                                        id="price-low-to-high"
                                        checked={
                                            checked === 'price-low-to-high'
                                        }
                                        onClick={e =>
                                            handleClick('sort', e.target.value)
                                        }
                                        className="opacity-0 absolute peer"
                                    />
                                    <label
                                        htmlFor="price-low-to-high"
                                        className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59]"></label>
                                    <label
                                        htmlFor="price-low-to-high"
                                        className="text-xs md:text-xl ms-3">
                                        Price: Low To Hight
                                    </label>
                                </li>
                                <li className="mt-3 flex items-center">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="price-high-to-low"
                                        id="price-high-to-low"
                                        checked={
                                            checked === 'price-high-to-low'
                                        }
                                        onClick={e =>
                                            handleClick('sort', e.target.value)
                                        }
                                        className="opacity-0 absolute peer"
                                    />
                                    <label
                                        htmlFor="price-high-to-low"
                                        className="w-5 h-5 bg-white border-2 border-black peer-checked:bg-[#225A59]"></label>
                                    <label
                                        htmlFor="price-high-to-low"
                                        className="text-xs md:text-xl ms-3">
                                        Price: Hight To Low
                                    </label>
                                </li>
                            </ul>
                        </form>
                    )}
                </div>
                <div
                    className={`w-32 md:w-52 ${collectionsOpen ? 'h-44' : 'h-10'} bg-white px-3 ${sortOpen ? 'md:mt-20' : 'md:mt-2'}  md:visible ${isOpen ? 'visible' : 'invisible'}`}>
                    <div className="flex justify-between items-center w-full h-10">
                        <p className="text-xs md:text-2xl font-bold">
                            Collections
                        </p>
                        <svg
                            onClick={() => {
                                setCollectionsOpen(!collectionsOpen)
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-2 md:w-4">
                            <path
                                d={`${collectionsOpen ? 'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z' : 'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'}`}
                            />
                        </svg>
                    </div>
                    {collectionsOpen && (
                        <form className="mt-8">
                            <ul>{displayCollections}</ul>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar
