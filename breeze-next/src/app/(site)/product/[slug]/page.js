import BreadcrumbComp from '@/components/Breadcrumb'
import Details from '@/components/Details'

const Product = ({ params }) => {
    const { slug } = params

    return (
        <>
            <header>
                <div className="w-screen">
                    <BreadcrumbComp />
                </div>
            </header>
            <main className="w-screen h-screen overflow-hidden flex lg:pt-40">
                <Details slug={slug} />
            </main>
        </>
    )
}
export default Product
