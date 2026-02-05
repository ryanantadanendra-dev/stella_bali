const SearchBar = () => {
    return (
        <div className="w-96 h-10 flex justify-around px-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
                type="text"
                name="product"
                className=" border-b-gray-300
                            border-b-2
                            w-full
                            border-0
                            focus:border-b-black
                            focus:border-b-2
                            focus:outline-none
                            focus:ring-0"
                placeholder="Search Product"
            />
        </div>
    )
}
export default SearchBar
