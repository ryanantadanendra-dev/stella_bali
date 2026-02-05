import Image from 'next/image'
import image from '../../public/Assets/hero1.jpg'

const Wrapper = ({ index, category }) => {
    return (
        <figure
            key={index}
            className={`wrapper relative overflow-hidden rounded-2xl ${index % 3 === 0 ? 'row-span-2' : 'row-span-1'} bg-white`}>
            <Image src={image} fill className="object-cover" />
            <div className="overlay absolute z-30 inset-0 w-full"></div>
            <figcaption className="bottom-0 absolute text-white text-6xl z-40">
                {category}
            </figcaption>
        </figure>
    )
}
export default Wrapper
