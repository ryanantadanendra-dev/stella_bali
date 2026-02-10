import BreadcrumbComp from '@/components/Breadcrumb'
import Sidebar from '@/components/Sidebar'
import ProductsComponent from '@/components/Products'

const Products = ({ searchParams }) => {
    const { sort = '', collections = '', type = '' } = searchParams

    return (
        <>
            <header>
                <div className="w-screen">
                    <BreadcrumbComp />
                </div>
            </header>
            <main className="w-screen h-full flex">
                <Sidebar />
                <ProductsComponent
                    sort={sort}
                    collections={collections}
                    type={type}
                />
            </main>
        </>
    )
}

export default Products
