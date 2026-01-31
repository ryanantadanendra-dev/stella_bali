'use client'

import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 1000) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        checkMobile()

        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [breakpoint])

    return isMobile
}
