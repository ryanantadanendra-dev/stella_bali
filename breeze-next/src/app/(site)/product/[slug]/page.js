import BreadcrumbComp from '@/components/Breadcrumb'
import Details from '@/components/Details'

const Product = ({ params }) => {
    const { slug } = params

    return (
        <div>
            <header>
                <div className="w-screen pt-32 flex justify-center md:block md:ps-12 lg:ps-32">
                    <BreadcrumbComp />
                </div>
            </header>
            <main className="w-screen h-full lg:h-screen pb-20 lg:pb-0 md:mt-12 lg:mt-20">
                <Details slug={slug} />
            </main>
        </div>
    )
}
export default Product
