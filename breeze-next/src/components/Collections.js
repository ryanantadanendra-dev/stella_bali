'use client'

import { useProduct } from '@/hooks/product'
import Wrapper from './Wrapper'

const Collections = () => {
    const { categories } = useProduct()
    console.log(categories)

    return (
        <section className="w-screen">
            <h2>Product Collections</h2>
            <div className="grid grid-cols-2 auto-rows-[200px] gap-6">
                {categories?.map((category, index) => {
                    const isEdge =
                        index === 0 || index === categories.length - 1
                    return <Wrapper index={isEdge} category={category} />
                })}
            </div>
        </section>
    )
}
export default Collections
