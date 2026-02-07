'use client'

import { useProduct } from '@/hooks/product'
import Wrapper from './Wrapper'

const Collections = () => {
    const { categories } = useProduct()
    console.log(categories)

    return (
        <section className="w-screen py-32 pe-28">
            <h2 className="text-3xl font-bold">Product Collections</h2>
            <div className="grid grid-cols-2 auto-rows-[200px] gap-6 mt-12">
                {categories?.map((category, index) => {
                    const isEdge =
                        index === 0 || index === categories.length - 1
                    return <Wrapper index={index} category={category} />
                })}
            </div>
        </section>
    )
}
export default Collections
