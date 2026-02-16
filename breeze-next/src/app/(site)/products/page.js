// app/(user)/products/page.jsx
import { Suspense } from 'react'
import ProductsComponent from '@/components/Products'
import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('@/components/Sidebar'), {
    ssr: true, // Changed to true for better SEO
    loading: () => <SidebarSkeleton />,
})

export const revalidate = 3600

export const metadata = {
    title: 'Products',
    description: 'Browse our sustainable handmade fashion collection',
}

// Skeleton for sidebar
function SidebarSkeleton() {
    return <aside className="md:w-80 w-32 bg-gray-100 h-screen animate-pulse" />
}

// Optimize data fetching
async function getInitialData() {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const [productsRes, userRes] = await Promise.all([
            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/products`,
                {
                    next: { revalidate: 3600 },
                    headers: {
                        Accept: 'application/json',
                        'Cache-Control': 'public, max-age=3600',
                    },
                    signal: controller.signal,
                },
            ).catch(() => ({ ok: false })),

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
                next: { revalidate: 300 },
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            }).catch(() => ({ ok: false })),
        ])

        clearTimeout(timeoutId)

        const products = productsRes.ok
            ? await productsRes.json()
            : { data: [], categories: [] }
        const user = userRes.ok ? await userRes.json() : null

        return { products, user }
    } catch (error) {
        console.error('Data fetch error:', error)
        return { products: { data: [], categories: [] }, user: null }
    }
}

// Optimized loading skeleton
function ProductsLoading() {
    return (
        <section className="flex w-full flex-wrap justify-center gap-4 p-4">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="product-card animate-pulse bg-gray-200 rounded-lg">
                    <div className="product-image-container bg-gray-300" />
                    <div className="p-4 h-24 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                        <div className="h-6 bg-gray-300 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </section>
    )
}

export default async function ProductsPage({ searchParams }) {
    const { products } = await getInitialData()

    const sort = searchParams?.sort || null
    const collections = searchParams?.collections || null
    const type = searchParams?.type || null

    return (
        <main className="h-full w-screen md:flex md:pt-28 pt-20">
            <Sidebar />
            <Suspense fallback={<ProductsLoading />}>
                <ProductsComponent
                    sort={sort}
                    collections={collections}
                    type={type}
                    initialProducts={products}
                />
            </Suspense>
        </main>
    )
}
