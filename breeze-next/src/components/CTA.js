import Image from 'next/image'
import Bg from '../../public/Assets/cta.png'
import Link from 'next/link'

const CTA = ({ heading, subheading }) => {
    return (
        <div
            className="w-screen h-96 bg-center bg-no-repeat bg-cover flex justify-center items-center flex-col gap-3 text-white relative mt-32"
            style={{ backgroundImage: `url(${Bg.src})` }}>
            <div className="absolute text-center z-10">
                <h1 className="font-bold text-4xl">{heading}</h1>
                <p className="mt-5 px-2 md:px-32 lg:px-72">{subheading}</p>
                <div className="flex justify-center mt-8 gap-12">
                    <Link
                        href=""
                        className="px-4 py-5 md:px-7 md:py-4 bg-white text-black">
                        Shop Collection
                    </Link>
                    <Link
                        href={``}
                        className="px-4 py-5 md:px-7 md:py-4 bg-transparent border-2 border-white">
                        Contact Us
                    </Link>
                </div>
            </div>
            <div className="bg-[#00000030] w-full h-full absolute z-0"></div>
        </div>
    )
}
export default CTA
