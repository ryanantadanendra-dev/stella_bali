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

export default function BreadcrumbComp() {
    const pathName = usePathname()

    const segments = pathName.split('/').filter(Boolean)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<a href="/" />}>
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                    const href = '/'
                    const isLast = index === segments.length - 1

                    console.log(segment)

                    return (
                        <span key={href} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="capitalize">
                                        {segment.replace(/-/g, ' ')}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={href}
                                            className="capitalize">
                                            {segment.replace(/-/g, ' ')}
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
