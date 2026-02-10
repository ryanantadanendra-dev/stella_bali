import Image from 'next/image'
import image from '../../public/Assets/hero1.jpg'

const Wrapper = ({ index, category }) => {
    return (
        <figure
            key={index}
            className={`wrapper relative overflow-hidden rounded-2xl ${index === 0 ? 'row-span-2' : index === 1 ? 'row-span-1' : index === 2 ? 'row-span-2' : index === 3 ? 'row-span-3' : 'row-span-2 '} bg-white`}>
            <Image src={image} fill className="object-cover" />
            <div className="overlay absolute z-30 inset-0 w-full"></div>
            <figcaption className="bottom-0 absolute text-white text-6xl z-40 flex w-full justify-between py-2 px-3">
                {category}
                {index !== 3 && (
                    <div className="text-xl">
                        <p>Man</p>
                        <p>Woman</p>
                    </div>
                )}
            </figcaption>
        </figure>
    )
}
export default Wrapper
