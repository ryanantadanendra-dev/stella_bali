'use client'

import { useEffect, useState } from 'react'
import { useProduct } from '@/hooks/product'
import { useSearchParams, useRouter } from 'next/navigation'

const types = ['man', 'woman']

const Sidebar = ({ onChange }) => {
    const [buttonName, setButtonName] = useState('')
    const [sortOpen, setSortOpen] = useState(false)
    const [collectionsOpen, setCollectionsOpen] = useState(false)
    const [extendCollection, setExtendCollection] = useState('')
    const { categories } = useProduct()
    const searchParams = useSearchParams()
    const router = useRouter()
    const sort = searchParams.get('sort')
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
    }, [sort])

    const displayCollections = types.map(type => (
        <>
            <li className="flex gap-2 mt-3">
                <input
                    onChange={e => {
                        handleChange('type', e.target.value)
                        setExtendCollection(type)
                    }}
                    type="radio"
                    value={type}
                    name="type"
                />
                <label>{type}</label>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    // onClick={prev =>
                    //     setExtendCollection(prev =>
                    //         prev === type ? null : type,
                    //     )
                    // }
                    className="w-3">
                    <path d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z" />
                </svg>
            </li>
            {extendCollection == type
                ? categories?.map((category, index) => (
                      <li key={index} className="mt-3 ms-5">
                          <input
                              onChange={e =>
                                  handleChange('collections', e.target.value)
                              }
                              type="radio"
                              value={category}
                              name="collections"
                          />
                          <label>{category}</label>
                      </li>
                  ))
                : null}
        </>
    ))

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
                                    checked={sort === 'new-arrivals'}
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
                        <ul>{displayCollections}</ul>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Sidebar
