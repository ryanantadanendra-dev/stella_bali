import Image from 'next/image'
import Bg from '../../public/Assets/hero.png'

const Hero = ({ title }) => {
    return (
        <>
            <header
                className="w-screen md:h-80 h-72 bg-center bg-no-repeat bg-cover flex justify-center items-center flex-col gap-3 text-white relative"
                style={{ backgroundImage: `url(${Bg.src})` }}>
                <div className="absolute text-center z-10">
                    <h1 className="font-bold text-3xl md:text-5xl">{title}</h1>
                    <p>Where Bali's spirit meets contemporary summer style</p>
                </div>
                <div className="bg-[#00000030] w-full h-full absolute z-0"></div>
            </header>
        </>
    )
}
export default Hero
