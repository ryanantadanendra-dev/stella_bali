'use client'

import { useProduct } from '@/hooks/product'
import Wrapper from './Wrapper'

const Collections = () => {
    const { categories } = useProduct()

    return (
        <section className="w-screen py-32 md:px-12 px-2">
            <h2 className="text-3xl font-bold text-center md:text-left">
                Product Collections
            </h2>
            <div className="grid grid-cols-2 auto-rows-[200px] md:gap-6 gap-1 mt-12">
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
