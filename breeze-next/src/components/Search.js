import Image from 'next/image'
import Card from './Card'

const Search = ({ datas, isActive }) => {
    return (
        <div
            className={`${isActive ? 'visited: opacity-100' : 'invisible opacity-0'} transition-all duration-200 ease-out  w-screen h-[27rem] bg-white absolute bottom-[-27.8rem] z-50 flex justify-center flex-wrap overflow-y-scroll py-[1rem] gap-4`}>
            {datas?.map((data, index) => (
                <>
                    <Card data={data} />
                </>
            ))}
        </div>
    )
}
export default Search
