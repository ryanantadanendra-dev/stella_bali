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

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

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

export default function UserLayout({ children }) {
    return (
        <>
            <header>
                <Suspense fallback={<NavbarSkeleton />}>
                    <Navbar />
                </Suspense>
            </header>

            {/*
                FIX: Removed min-h-screen from <main>.
                The root layout.js inline CSS already sets main { min-height: 100vh }
                via the critical CSS block. Duplicating it here causes a specificity
                conflict and is redundant.
            */}
            <main>{children}</main>

            <Suspense fallback={<FooterSkeleton />}>
                <Footer />
            </Suspense>
        </>
    )
}
