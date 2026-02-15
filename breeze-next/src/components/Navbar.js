'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import Logo from '../../public/Assets/Logo.png'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import Hamburger from './Hamburger'
import { useProduct } from '@/hooks/product'
import Collections from './Collections'

const COLLECTIONS = ['Man', 'Woman']

const Navbar = () => {
    const isMobile = useIsMobile(1024)
    const { user } = useAuth({ middlewate: 'guest' })
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const { categories } = useProduct()

    const MenuIcon = ({ onClick }) => (
        <button
            onClick={onClick}
            aria-label="Open navigation menu"
            aria-expanded="false"
            className="p-3 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            type="button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6"
                aria-hidden="true">
                <path
                    fill="#000000"
                    d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                />
            </svg>
        </button>
    )

    const toggleMobileMenu = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const toggleDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen(prev => !prev)
    }, [])

    const toggleHover = useCallback(() => {
        setIsHovered(prev => !prev)
    }, [])

    const filterSubtyoe = type => {
        if (type == 'Man') {
            return categories.filter(c => c !== 'Dresses')
        } else {
            return categories
        }
    }

    const ChevronIcon = ({ isOpen }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className={`w-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true">
            <path
                fill="#000000"
                d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"
            />
        </svg>
    )

    if (!user) {
        return (
            <nav
                className={`w-screen h-20 bg-white flex items-center ${isMobile ? 'justify-between px-2' : 'px-8'} fixed top-0 z-50`}>
                <div className="w-1/3">
                    <figure className="relative w-32 h-20">
                        <Image src={Logo} fill className="object-contain" />
                    </figure>
                </div>
                {isMobile ? (
                    <>
                        <MenuIcon onClick={toggleMobileMenu} />
                        {/* Mobile Hamburger Menu */}
                        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
                    </>
                ) : (
                    <>
                        <ul className="flex gap-8 text-[0.8rem] w-1/3 justify-center">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href={`/products?sort=new-arrivals`}>
                                    New Arrival
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <Link href="/products">Products</Link>
                                <button
                                    onClick={toggleDesktopMenu}
                                    aria-label="Toggle services menu"
                                    aria-expanded={isDesktopMenuOpen}
                                    aria-haspopup="true"
                                    className="p-1"
                                    type="button">
                                    <ChevronIcon isOpen={isDesktopMenuOpen} />
                                </button>
                            </li>

                            {/* Dropdown Menu */}
                            <div
                                onMouseLeave={() => setIsHovered(null)}
                                className={`
                                    extended-menu top-16 w-screen left-0 bg-white
                                    absolute transition-all duration-200 ease-out
                                    ${
                                        isDesktopMenuOpen
                                            ? 'visible opacity-100 h-auto'
                                            : 'invisible opacity-0 h-0 overflow-hidden'
                                    }
                                `}
                                role="menu"
                                aria-label="Services submenu">
                                <ul className="flex justify-center">
                                    {COLLECTIONS.map((type, index) => (
                                        <li
                                            onMouseEnter={() =>
                                                setIsHovered(type)
                                            }
                                            key={index}
                                            className="h-[44.8px] text-black bg-white hover:bg-white hover:text-black px-6 transition-colors flex items-center"
                                            role="none">
                                            <button
                                                onClick={() => {
                                                    router.push(
                                                        `/products?type=${type}`,
                                                    )
                                                    setIsDesktopMenuOpen(false)
                                                }}
                                                className="w-full text-left"
                                                type="button"
                                                role="menuitem">
                                                {type}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <ul
                                    onMouseOver={e => e.stopPropagation()}
                                    className={`flex justify-center items-center
                                        ${
                                            isHovered == 'Man' ||
                                            isHovered == 'Woman'
                                                ? 'visible opacity-100 h-32'
                                                : 'invisible opacity-0 h-0 overflow-hidden'
                                        }
                                    `}>
                                    {filterSubtyoe(isHovered)?.map(
                                        (subtype, index) => (
                                            <li
                                                key={index}
                                                className="h-[44.8px] text-black hover:bg-white hover:text-black px-6 transition-colors flex items-center"
                                                role="none">
                                                <button
                                                    onClick={() => {
                                                        router.push(
                                                            `/products?type=${isHovered}&collections=${subtype}`,
                                                        )
                                                        setIsDesktopMenuOpen(
                                                            false,
                                                        )
                                                    }}
                                                    className="w-full text-left"
                                                    type="button"
                                                    role="menuitem">
                                                    {subtype}
                                                </button>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>

                            <li>
                                <Link href="/about">About Us</Link>
                            </li>
                            <li>
                                <Link href="/blogs">Blogs</Link>
                            </li>
                        </ul>
                        <div className="w-1/3 flex justify-end">
                            <svg
                                onClick={() => router.push('/?search=true')}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4">
                                <path
                                    fill="#000000"
                                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                />
                            </svg>
                        </div>
                    </>
                )}
            </nav>
        )
    }
}

export default Navbar
