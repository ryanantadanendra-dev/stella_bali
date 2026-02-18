'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useProduct } from '@/hooks/product'

const COLLECTIONS = ['Man', 'Woman']

const Hamburger = ({ isOpen, setIsOpen }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isExtended, setIsExtended] = useState(false)
    const [openSubtype, setOpenSubtype] = useState('')
    const { categories } = useProduct()

    useEffect(() => {
        if (!isOpen) {
            setIsExtended(false)
            setOpenSubtype(null)
        }

        if (!isExtended) {
            setOpenSubtype(null)
        }
    }, [isOpen, isExtended])

    const menuHeight = !isExtended
        ? 'h-[224px]'
        : openSubtype === null
          ? 'h-[313.6px]'
          : openSubtype === 'Man'
            ? 'h-[492.8px]'
            : openSubtype === 'Woman'
              ? 'h-[537.6px]'
              : 'h-[313.6px]'

    const filterCategories = () => {
        if (openSubtype == 'Man')
            return categories?.filter(category => category !== 'Dresses')

        return categories
    }

    return (
        <div
            className={`menu-wrapper w-screen ${menuHeight} absolute bg-white transition-all duration-200 ease-out ${isOpen ? 'top-20 opacity-100' : '-top-96 opacity-0'} left-0`}>
            <div className="link-wrapper">
                <div className="link-wrapper h-[44.8px] text-black hover:bg-white hover:text-black flex items-center">
                    <Link
                        onClick={() => setIsOpen(false)}
                        href="/"
                        className="ms-3">
                        Home
                    </Link>
                </div>
                <div
                    className={`link-wrapper h-[44.8px] text-black hover:bg-white hover:text-black flex items-center`}>
                    <Link
                        onClick={() => setIsOpen(false)}
                        href="/products?sort=new-arrivals"
                        className="ms-3">
                        New Arrivals
                    </Link>
                </div>
                <div
                    className="link-wrapper h-[44.8px] text-black hover:bg-white hover:text-black flex items-center gap-1"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <Link
                        onClick={() => setIsOpen(false)}
                        href="/products"
                        className="ms-3">
                        Products
                    </Link>
                    <svg
                        onClick={() => setIsExtended(!isExtended)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-3">
                        <path
                            fill="#000000"
                            d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"
                        />
                    </svg>
                </div>
                {isExtended && (
                    <div className="extended-menu">
                        {COLLECTIONS.map((data, index) => (
                            <>
                                <div
                                    className={`link-wrapper h-[44.8px] text-black hover:bg-white hover:text-black flex items-center gap-1`}>
                                    <Link
                                        onClick={() => setIsOpen(false)}
                                        href={`/products?type=${data}`}
                                        className="ms-3">
                                        {data}
                                    </Link>
                                    <svg
                                        onClick={prev =>
                                            setOpenSubtype(prev =>
                                                prev === data ? null : data,
                                            )
                                        }
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        className="w-3">
                                        <path
                                            fill={`#000000`}
                                            d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"
                                        />
                                    </svg>
                                </div>

                                <ul
                                    className={`${openSubtype == data ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                    {filterCategories().map(category => (
                                        <Link
                                            href={`/products?type=${data}&collections=${category}`}
                                            onClick={() => setIsOpen(false)}
                                            key={category}
                                            className={` block ms-8 ${openSubtype == data ? 'h-[44.8px]' : 'h-0'}`}>
                                            {category}
                                        </Link>
                                    ))}
                                </ul>
                            </>
                        ))}
                    </div>
                )}
                <div
                    className={`link-wrapper h-[44.8px] text-black hover:bg-white hover:text-black flex items-center`}>
                    <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="ms-3">
                        About Us
                    </Link>
                </div>
                <div
                    className={`link-wrapper h-[44.8px] text-black hover:bg-white hover:text-black flex items-center`}>
                    <Link
                        href="/blogs"
                        onClick={() => setIsOpen(false)}
                        className="ms-3">
                        Blogs
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hamburger
