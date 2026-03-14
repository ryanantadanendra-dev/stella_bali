// app/(user)/layout.jsx
// FIX: Navbar and Footer are server components — wrapping them in Suspense
// only makes sense if they do async work (data fetching). If they're purely
// presentational, Suspense adds overhead with no benefit.
//
// The skeletons also cause CLS because they render at h-20 / h-64 and then
// get replaced. Since the nav height is guaranteed by the inline CSS in
// layout.js, the skeleton is redundant.
//
// Keep Suspense ONLY if Navbar/Footer actually await data inside them.

import { headers } from 'next/headers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import { DictProvider } from '@/hooks/useDict'

export const metadata = {
    title: 'Stella Bali',
}

// FIX: Skeleton kept only as a fallback for slow data-fetching scenarios.
// If Navbar is purely static, delete NavbarSkeleton and remove the Suspense wrapper.
function NavbarSkeleton() {
    return (
        <div
            // FIX: Must match the nav height in layout.js inline CSS (5rem = h-20)
            // to prevent CLS during the skeleton → real nav swap
            className="h-20 w-full bg-white"
            aria-hidden="true"
        />
    )
}

function FooterSkeleton() {
    return <div className="h-64 w-full bg-gray-100" aria-hidden="true" />
}

export default async function UserLayout({ children, searchParams }) {
    const headersList = await headers()
    const params = await searchParams
    const lang = headersList.get('x-lang') || 'en'
    const dict = await getDictionary(lang)

    return (
        <>
            <DictProvider dict={dict}>
                <header>
                    <Navbar lang={lang} />
                </header>

                <main>{children}</main>

                <Suspense fallback={<FooterSkeleton />}>
                    <Footer dict={dict} />
                </Suspense>
            </DictProvider>
        </>
    )
}
