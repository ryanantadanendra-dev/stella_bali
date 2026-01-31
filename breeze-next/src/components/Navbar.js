'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'

const Navbar = () => {
    const isMobile = useIsMobile(1024)
    const { user } = useAuth({ middlewate: 'guest' })

    if (!isMobile && !user) {
        return (
            <nav className="w-screen h-20 bg-white flex justify-around items-center">
                <figure className="relative w-44 h-32"></figure>
            </nav>
        )
    }
}

export default Navbar
