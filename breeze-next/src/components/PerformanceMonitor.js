'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'performance' in window) {
            // Log Web Vitals
            const observer = new PerformanceObserver(list => {
                for (const entry of list.getEntries()) {
                    console.log(`${entry.name}:`, entry.value)
                }
            })

            observer.observe({
                entryTypes: [
                    'largest-contentful-paint',
                    'first-input',
                    'layout-shift',
                ],
            })

            return () => observer.disconnect()
        }
    }, [])

    return null
}
