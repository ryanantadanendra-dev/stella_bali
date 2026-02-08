'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import Logo from '../../public/Assets/Logo.png'
import Link from 'next/link'

const Navbar = () => {
    const isMobile = useIsMobile(1024)
    const { user } = useAuth({ middlewate: 'guest' })
    const router = useRouter()

    if (!isMobile && !user) {
        return (
            <nav className="w-screen h-20 bg-white flex items-center px-8">
                <div className="w-1/3">
                    <figure className="relative w-32 h-20">
                        <Image src={Logo} fill className="object-contain" />
                    </figure>
                </div>
                <div className="flex gap-8 text-xs w-1/3 justify-center">
                    <Link href="/">Home</Link>
                    <Link href={`/products?sort=new-arrivals`}>
                        New Arrival
                    </Link>
                    <Link href="/products">Products</Link>
                    <Link href="/">About Us</Link>
                </div>
                <div className="w-1/3 flex justify-end">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </div>
            </nav>
        )
    }
}

export default Navbar
