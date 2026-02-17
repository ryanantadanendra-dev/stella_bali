// components/BreadcrumbComp.jsx - OPTIMIZED
'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useMemo } from 'react'

export default function BreadcrumbComp() {
    const pathName = usePathname()

    // Memoize segments to prevent recalculation
    const segments = useMemo(
        () => pathName.split('/').filter(Boolean),
        [pathName],
    )

    // Build full path progressively
    const buildPath = index => {
        return '/' + segments.slice(0, index + 1).join('/')
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/" aria-label="Go to home page">
                            Home
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                    let href = buildPath(index)

                    if (href == '/product') href = '/products'

                    const isLast = index === segments.length - 1
                    const label = segment.replace(/-/g, ' ')

                    return (
                        <span key={href} className="flex items-center">
                            <BreadcrumbSeparator aria-hidden="true" />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="capitalize">
                                        {label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={href}
                                            className="capitalize"
                                            aria-label={`Go to ${label}`}>
                                            {label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </span>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
