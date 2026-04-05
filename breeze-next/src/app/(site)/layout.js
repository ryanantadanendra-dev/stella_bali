import { headers } from 'next/headers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import { DictProvider } from '@/hooks/useDict'

export const metadata = {
    title: 'Stella Bali',
}

function NavbarSkeleton() {
    return <div className="h-20 w-full bg-white" aria-hidden="true" />
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
                    <Navbar />
                </header>

                <main>{children}</main>

                <Suspense fallback={<FooterSkeleton />}>
                    <Footer dict={dict} />
                </Suspense>
            </DictProvider>
        </>
    )
}
