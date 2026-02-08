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
            <main className="w-screen py-12 pb-72 overflow-hidden">
                <Details slug={slug} />
            </main>
        </>
    )
}
export default Product
