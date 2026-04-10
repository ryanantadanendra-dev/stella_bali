'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from '../../public/Assets/Logo.png'
import Link from 'next/link'
import { useState, useCallback, useMemo, useEffect } from 'react'
import Hamburger from './Hamburger'
import LangBtm from './LangBtn'
import { useSearchParams } from 'next/navigation'
import { useDict } from '@/hooks/useDict'
import dynamic from 'next/dynamic'

const MenuIcon = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label="Open navigation menu"
        className="p-3 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-70 transition-opacity"
        type="button">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6"
            aria-hidden="true">
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
        </svg>
    </button>
)

const ChevronIcon = ({ isOpen }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        className={`w-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        aria-hidden="true">
        <path d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z" />
    </svg>
)

const Navbar = () => {
    const isMobile = useIsMobile(1024)
    const router = useRouter()
    const dict = useDict()
    const searchParams = useSearchParams()
    const lang = searchParams.get('lang') || 'en'

    const [isOpen, setIsOpen] = useState(false)
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(null)
    const collectionsList = dict?.home?.collectionsList ?? []

    // Handlers
    const toggleMobileMenu = useCallback(() => setIsOpen(v => !v), [])
    const toggleDesktopMenu = useCallback(
        () => setIsDesktopMenuOpen(v => !v),
        [],
    )

    const handleNavigation = useCallback(
        url => {
            router.push(url)
            setIsDesktopMenuOpen(false)
            setIsOpen(false) // Close mobile menu if open
        },
        [router],
    )

    const EXCLUDED = ['dresses', 'gaun']

    // Filtered categories: Logic fix to ensure "Dresses" only shows for Women
    const filteredCategories = useMemo(() => {
        if (!collectionsList.length) return []
        const isMan = isHovered === dict?.home?.gender?.[0] // "Man" atau "Pria"
        return isMan
            ? collectionsList.filter(c => !EXCLUDED.includes(c.toLowerCase()))
            : collectionsList
    }, [isHovered, collectionsList])

    return (
        <nav className="w-full h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 fixed top-0 z-[100]">
            {/* Left: Logo */}
            <div className=" lg:flex-none">
                <Link
                    href={`/?lang=${lang}`}
                    className="inline-block relative w-32 h-12"
                    aria-label="Home">
                    <Image
                        src={Logo}
                        alt="Stella Bali Logo"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                    />
                </Link>
            </div>

            {/* Center: Desktop Links */}
            {!isMobile && (
                <ul className="flex items-center h-full block gap-8 text-[0.5rem] uppercase tracking-widest font-medium w-full justify-center">
                    <li>
                        <Link
                            href={`/?lang=${lang}`}
                            className="hover:text-gray-500 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/products?lang=${lang}&sort=new-arrivals`}
                            className="hover:text-gray-500 transition-colors">
                            {dict?.navbar?.newarrival}
                        </Link>
                    </li>
                    <li className="flex items-center gap-1 group relative">
                        <Link
                            href={`/products?lang=${lang}`}
                            className="hover:text-gray-500 transition-colors">
                            {dict?.navbar?.products}
                        </Link>
                        <button onClick={toggleDesktopMenu} className="p-1">
                            <ChevronIcon isOpen={isDesktopMenuOpen} />
                        </button>
                    </li>
                    <li>
                        <Link
                            href={`/about?lang=${lang}`}
                            className="hover:text-gray-500 transition-colors">
                            {dict?.navbar?.about}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/blogs?lang=${lang}`}
                            className="hover:text-gray-500 transition-colors">
                            {dict?.navbar?.blogs}
                        </Link>
                    </li>
                </ul>
            )}
            {/* Right: Search */}
            <div className=" lg:flex-none flex justify-end items-center gap-4">
                <button
                    onClick={() => router.push(`/?search=true&lang=${lang}`)}
                    aria-label="Search"
                    className="p-2 hover:opacity-60 transition-opacity">
                    <svg viewBox="0 0 512 512" className="w-4">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </button>
                {!isMobile && <LangBtm lang={lang} />}

                {isMobile && <MenuIcon onClick={toggleMobileMenu} />}
            </div>

            {/* Desktop Mega Menu Dropdown */}
            {!isMobile && (
                <div
                    onMouseLeave={() => {
                        setIsHovered(null)
                        setIsDesktopMenuOpen(false)
                    }}
                    className={`absolute top-20 left-0 w-full bg-white shadow-xl transition-all duration-300 border-t border-gray-50 ${
                        isDesktopMenuOpen
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}>
                    <div className="max-w-screen-xl mx-auto flex justify-center py-10 px-8 gap-20">
                        {dict?.home?.gender.map((type, index) => (
                            <div
                                key={type}
                                onMouseEnter={() => setIsHovered(type)}
                                className="flex flex-col gap-4">
                                <button
                                    onClick={() =>
                                        handleNavigation(
                                            `/products?lang=${lang}&type=${type}`,
                                        )
                                    }
                                    className={`text-lg font-bold uppercase transition-colors ${isHovered === type ? 'text-black' : 'text-gray-400'}`}>
                                    {type}
                                </button>
                                {isHovered === type && (
                                    <ul className="flex flex-col gap-2">
                                        {filteredCategories.map((cat, i) => (
                                            <li key={cat}>
                                                <button
                                                    onClick={() =>
                                                        handleNavigation(
                                                            `/products?lang=${lang}&type=${type}&collections=${cat}`,
                                                        )
                                                    }
                                                    className="text-sm text-gray-600 hover:text-black transition-colors">
                                                    {cat}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Hamburger
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dict={dict}
                lang={lang}
            />
        </nav>
    )
}

const NavbarComponent = Navbar

export default dynamic(() => Promise.resolve(NavbarComponent), { ssr: false })
