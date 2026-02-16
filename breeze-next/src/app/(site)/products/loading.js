const ProductsLoading = () => (
    <section className="w-full flex justify-center flex-wrap gap-4">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="w-80 h-[30rem] bg-gray-200 animate-pulse" />
        ))}
    </section>
)

export default ProductsLoading
