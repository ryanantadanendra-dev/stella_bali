// app/(user)/products/page.jsx
// FIXES:
//   - Resource load delay 3,080ms: Products now fetched server-side.
//     Image URL is in the initial HTML, so browser starts loading it immediately.
//   - Render-blocking CSS: inlineCss works in production builds
//   - bfcache: removed no-store headers where possible
//   - Preload LCP image with correct width for mobile (640px for Moto G Power)

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ProductsComponent from '@/components/Products'
import BreadcrumbComp from '@/components/Breadcrumb'

// Sidebar: SSR renders structure, dynamic only for client interactivity
const Sidebar = dynamic(() => import('@/components/Sidebar'), {
    ssr: true,
    loading: () => <SidebarSkeleton />,
})

export const revalidate = 3600

export const metadata = {
    title: 'Products',
    description: 'Browse our sustainable handmade fashion collection',
}

function SidebarSkeleton() {
    return (
        <aside
            className="md:w-80 w-32 bg-gray-100 md:min-h-screen shrink-0"
            aria-hidden="true"
        />
    )
}

// Fetch products server-side — this is what eliminates the 3080ms delay.
// The result is embedded in HTML so the browser knows the image URL immediately.
async function getProducts() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/products`,
            {
                next: { revalidate: 3600 },
                headers: { Accept: 'application/json' },
            },
        )
        if (!res.ok) return { data: [], categories: [] }
        return res.json()
    } catch {
        return { data: [], categories: [] }
    }
}

function ProductsLoading() {
    return (
        <section className="flex w-full flex-wrap justify-center gap-4 p-4">
            {Array.from({ length: 6 }, (_, i) => (
                <div
                    key={i}
                    className="w-80 h-[30rem] animate-pulse bg-gray-200 rounded-lg"
                    aria-hidden="true"
                />
            ))}
        </section>
    )
}

export default async function ProductsPage({ searchParams }) {
    // Await searchParams for Next.js 15 compatibility
    const params = await Promise.resolve(searchParams)
    const sort = params?.sort ?? null
    const collections = params?.collections ?? null
    const type = params?.type ?? null

    // Fetch server-side — result is in HTML before client JS runs
    const products = await getProducts()

    // Determine LCP image URL server-side for preload
    // Apply same type/collections filter as client to get the actual first visible product
    let visibleProducts = products?.data ?? []
    if (type) {
        visibleProducts = visibleProducts.filter(
            p => p.type?.toLowerCase() === type.toLowerCase(),
        )
    }
    if (collections) {
        visibleProducts = visibleProducts.filter(
            p => p.subtype?.toLowerCase() === collections.toLowerCase(),
        )
    }

    const firstProduct = visibleProducts[0]
    const lcpImagePath = firstProduct?.images?.[0]?.path ?? firstProduct?.image
    const lcpImageOrigin = process.env.NEXT_PUBLIC_BACKEND_URL
    const lcpImageSrc = lcpImagePath
        ? `${lcpImageOrigin}/storage/${lcpImagePath}`
        : null

    // Build the Next.js optimized image URL for preload
    // Use w=640 — Moto G Power (Lighthouse test device) has a ~412px wide viewport
    // at 2.6x DPR = ~1071px but we cap at next nearest deviceSize = 640
    // (or 750 if you add it to deviceSizes in next.config.js)
    const lcpPreloadUrl = lcpImageSrc
        ? `/_next/image?url=${encodeURIComponent(lcpImageSrc)}&w=640&q=75`
        : null

    return (
        <>
            {/*
                FIX: Preload the LCP image before anything else.
                This is what eliminates the "Resource load delay: 3,080ms" —
                the browser starts the image fetch from the very first HTML byte,
                not after 3 seconds of JS execution + API calls.

                imagesrcset mirrors what next/image generates for this image,
                so the browser can pick the right size early.
            */}
            {lcpPreloadUrl && (
                <link
                    rel="preload"
                    as="image"
                    href={lcpPreloadUrl}
                    // Match the sizes attribute used in <Card> exactly
                    // so the browser's preload scanner can match it to the <img>
                    imageSizes="320px"
                    imageSrcSet={[
                        `/_next/image?url=${encodeURIComponent(lcpImageSrc)}&w=320&q=75 320w`,
                        `/_next/image?url=${encodeURIComponent(lcpImageSrc)}&w=640&q=75 640w`,
                    ].join(', ')}
                    crossOrigin="anonymous"
                />
            )}

            <main className="h-full w-screen md:flex md:pt-28 pt-20">
                <Sidebar />
                <div className="lg:ps-0">
                    <BreadcrumbComp />
                    <Suspense fallback={<ProductsLoading />}>
                        <ProductsComponent
                            sort={sort}
                            collections={collections}
                            type={type}
                            initialProducts={products}
                        />
                    </Suspense>
                </div>
            </main>
        </>
    )
}
