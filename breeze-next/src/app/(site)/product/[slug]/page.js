import BreadcrumbComp from '@/components/Breadcrumb'
import Details from '@/components/Details'
import getProducts from '@/lib/getProducts'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
    const { products } = await getProducts()
    const product = products?.data?.find(p => p.slug === params.slug)
    const imageUrl = product?.images[0]?.path
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${product.images[0]?.path}`
        : `https://stellabali.com/public/Assets/Logo.png`

    if (!product) {
        notFound()
    }

    return {
        title: product?.name + ' | Stella Bali Products',
        description: product?.description || `Read More About ${product?.name}`,
        openGraph: {
            title: product?.name,
            description: product?.description,
            siteName: 'Stella Bali',
            type: 'article',
            publishedTime: product?.created_at,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: product?.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: product?.name,
            description: product?.description,
            images: [imageUrl],
        },
    }
}

const Product = async ({ params }) => {
    const { slug } = params
    const { products } = await getProducts()

    return (
        <div>
            <header>
                <div className="w-screen pt-32 flex justify-center md:block md:ps-12 lg:ps-32">
                    <BreadcrumbComp />
                </div>
            </header>
            <main className="w-screen h-full lg:min-h-screen pb-20 lg:pb-12 md:mt-12 lg:mt-2">
                <Details slug={slug} />
            </main>
        </div>
    )
}
export default Product
