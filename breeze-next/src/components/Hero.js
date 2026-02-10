import Image from 'next/image'
import Bg from '../../public/Assets/hero.png'

const Hero = ({ title }) => {
    return (
        <header
            className="w-screen h-96 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${Bg.src})` }}>
            <h1 className="text-center">{title}</h1>
        </header>
    )
}
export default Hero
