'use client'

import { useState } from 'react'
import { useProduct } from '@/hooks/product'
import { useSearchParams, useRouter } from 'next/navigation'

const Sidebar = ({ onChange }) => {
    const [buttonName, setButtonName] = useState('')
    const [sortOpen, setSortOpen] = useState(false)
    const [collectionsOpen, setCollectionsOpen] = useState(false)
    const { categories } = useProduct()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [formData, setFormData] = useState({
        sort: '',
        collections: '',
    })

    const handleChange = (name, value) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        router.push(`?${params.toString()}`)
    }

    return (
        <div className="min-h-screen w-56 bg-white pt-7">
            <div
                className={`w-52 ${sortOpen ? 'h-44' : 'h-10'}  bg-white mx-auto px-3`}>
                <div className="flex justify-between items-center w-full h-10">
                    <p>Sort By</p>
                    <svg
                        onClick={() => {
                            setSortOpen(!sortOpen)
                            if (sortOpen) {
                                router.push('/products')
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4">
                        <path
                            d={`${sortOpen ? 'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z' : 'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'}`}
                        />
                    </svg>
                </div>
                {sortOpen && (
                    <form className="mt-8">
                        <ul>
                            <li>
                                <input
                                    type="radio"
                                    name="sort"
                                    value="new-arrivals"
                                    onChange={e =>
                                        handleChange('sort', e.target.value)
                                    }
                                />
                                <label>New Arrivals</label>
                            </li>
                            <li className="mt-3">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price-low-to-high"
                                    onChange={e =>
                                        handleChange('sort', e.target.value)
                                    }
                                />
                                <label>Price: Low To Hight</label>
                            </li>
                            <li className="mt-3">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price-high-to-low"
                                    onChange={e =>
                                        handleChange('sort', e.target.value)
                                    }
                                />
                                <label>Price: Hight To Low</label>
                            </li>
                        </ul>
                    </form>
                )}
            </div>
            <div
                className={`w-52 ${collectionsOpen ? 'h-44' : 'h-10'}  bg-white mx-auto px-3 mt-4`}>
                <div className="flex justify-between items-center w-full h-10">
                    <p>Collections</p>
                    <svg
                        onClick={() => {
                            setCollectionsOpen(!collectionsOpen)
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4">
                        <path
                            d={`${collectionsOpen ? 'M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z' : 'M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z'}`}
                        />
                    </svg>
                </div>
                {collectionsOpen && (
                    <form className="mt-8">
                        <ul>
                            {categories?.map((category, index) => (
                                <li key={index} className="mt-3">
                                    <input
                                        onChange={e =>
                                            handleChange(
                                                'collections',
                                                e.target.value,
                                            )
                                        }
                                        type="radio"
                                        value={category}
                                        name="collections"
                                    />
                                    <label>{category}</label>
                                </li>
                            ))}
                        </ul>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Sidebar
