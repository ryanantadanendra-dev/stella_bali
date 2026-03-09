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
    title: 'Explore Our Various Types Of Beachwear For Your Endless Summer | Stella Bali',
    description:
        'Explore various kinds of beachwear including beach tops, beach bottoms, swimwear, dresses, and accessories.',
    keywords: [
        'Stella Bali',
        'Bali Breeze Everyday Ease',
        'resort wear Bali',
        'breathable beachwear',
        'baju pantai Bali',
        'pakaian resort',
        'linen clothing Bali',
        'baju bahan linen',
        'island essentials',
        'brand lokal Bali',
        'pakaian musim panas',
    ],
    openGraph: {
        title: 'Explore Our Various Types Of Beachwear For Your Endless Summer | Stella Bali',
        description:
            'Explore various kinds of beachwear including beach tops, beach bottoms, swimwear, dresses, and accessories.',
        siteName: 'stellabali.com',
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Explore Our Various Types Of Beachwear For Your Endless Summer | Stella Bali',
        description:
            'Explore various kinds of beachwear including beach tops, beach bottoms, swimwear, dresses, and accessories.',
        creator: '@stellabaligroup',
        images: [
            {
                url: '../../../public/Assets/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Stella Bali Logo',
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
    },
}

function SidebarSkeleton() {
    return (
        <aside
            className="md:w-80 w-32 bg-gray-100 md:min-h-screen shrink-0"
            aria-hidden="true"
        />
    )
}

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
    const params = await Promise.resolve(searchParams)
    const sort = params?.sort ?? null
    const collections = params?.collections ?? null
    const type = params?.type ?? null

    const products = await getProducts()

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

    const lcpPreloadUrl = lcpImageSrc
        ? `/_next/image?url=${encodeURIComponent(lcpImageSrc)}&w=640&q=75`
        : null

    return (
        <>
            {lcpPreloadUrl && (
                <link
                    rel="preload"
                    as="image"
                    href={lcpPreloadUrl}
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
