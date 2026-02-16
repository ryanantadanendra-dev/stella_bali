import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

export const metadata = {
    title: 'Stella Bali',
}

function NavbarSkeleton() {
    return <div className="h-20 w-full bg-gray-100 animate-pulse" />
}

function FooterSkeleton() {
    return <div className="h-64 w-full bg-gray-100 animate-pulse" />
}

export default function UserLayout({ children }) {
    return (
        <>
            <header>
                <Suspense fallback={<NavbarSkeleton />}>
                    <Navbar />
                </Suspense>
            </header>

            <main className="min-h-screen">{children}</main>

            <Suspense fallback={<FooterSkeleton />}>
                <Footer />
            </Suspense>
        </>
    )
}
