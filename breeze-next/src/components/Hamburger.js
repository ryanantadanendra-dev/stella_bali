'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useProduct } from '@/hooks/product'
import LangBtm from './LangBtn'

const Hamburger = ({ isOpen, setIsOpen, dict, lang }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isExtended, setIsExtended] = useState(false)
    const [openSubtype, setOpenSubtype] = useState('')

    useEffect(() => {
        if (!isOpen) {
            setIsExtended(false)
            setOpenSubtype(null)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isExtended) {
            setOpenSubtype(null)
        }
    }, [isExtended])

    const menuHeight = !isExtended
        ? 'h-[268.8px]'
        : openSubtype === null
          ? 'h-[358.4px]'
          : openSubtype === 0 // index 0 = Man/Pria
            ? 'h-[537.6px]'
            : openSubtype === 1 // index 1 = Woman/Wanita
              ? 'h-[582.4px]'
              : 'h-[358.4px]'

    const filterCategories = () => {
        const isMan = openSubtype === 0 // index 0 selalu Man/Pria
        if (isMan)
            return dict?.home.collectionsList?.filter(
                category => category !== 'Dresses' && category !== 'Gaun',
            )
        return dict?.home.collectionsList
    }

    return (
        <div
            className={`menu-wrapper w-screen ${menuHeight} absolute bg-white transition-all duration-200 ease-out z-0 ${isOpen ? 'top-20 opacity-100' : '-top-96 opacity-0'} left-0`}>
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
                        {dict?.home.newarrival}
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
                        {dict?.footer.products}
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
                        {dict?.sidebar.gender.map((data, index) => (
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
                                        onClick={() =>
                                            setOpenSubtype(prev =>
                                                prev === index ? null : index,
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
                                    className={`${openSubtype == index ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                    {filterCategories().map(category => (
                                        <Link
                                            href={`/products?type=${data}&collections=${category}`}
                                            onClick={() => setIsOpen(false)}
                                            key={category}
                                            className={`block ms-8 ${openSubtype == index ? 'h-[44.8px]' : 'h-0'}`}>
                                            {' '}
                                            {/* ← ganti data → index */}
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
                        {dict?.about.hero}
                    </Link>
                </div>
                <div
                    className={`link-wrapper h-[44.8px] text-black hover:bg-white hover:text-black flex items-center`}>
                    <Link
                        href="/blogs"
                        onClick={() => setIsOpen(false)}
                        className="ms-3">
                        {dict?.hamburger?.blogs}
                    </Link>
                </div>
                <div
                    className={`link-wrapper h-[44.8px] ps-3 pb-3 flex items-center`}>
                    <LangBtm lang={lang} />
                </div>
            </div>
        </div>
    )
}

export default Hamburger
