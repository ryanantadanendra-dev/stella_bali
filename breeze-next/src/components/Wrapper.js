import Image from 'next/image'
import image from '../../public/Assets/hero1.jpg'

const Wrapper = ({ index, category }) => {
    return (
        <figure
            key={index}
            className={`wrapper relative overflow-hidden rounded-2xl ${index === 0 ? 'md:row-span-2' : index === 1 ? 'md:row-span-1' : index === 2 ? 'md:row-span-2' : index === 3 ? 'md:row-span-3' : 'md:row-span-2 '} bg-white`}>
            <Image src={image} fill className="object-cover" />
            <div className="overlay absolute z-30 inset-0 w-full"></div>
            <figcaption className="bottom-0 absolute text-white text-xl font-bold md:text-6xl z-40 flex w-full justify-between py-2 px-3">
                {category}
                {index !== 3 && (
                    <div className="md:text-xl text-xs">
                        <p>Man</p>
                        <p>Woman</p>
                    </div>
                )}
            </figcaption>
        </figure>
    )
}
export default Wrapper
