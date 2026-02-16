import Link from 'next/link'
import Logo from '../../public/Assets/Logo.png'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="w-screen md:h-full lg:h-96 py-12 md:px-12 lg:px-2 lg:py-0 bg-[#404040] flex lg:gap-0 md:gap-12 flex-wrap justify-between items-center text-white">
            <div className="lg:w-1/4 md:w-full lg:px-12">
                <p className="text-5xl font-bold">StellaBali.</p>
                <p className="mt-3">
                    Bali-based summerwear with light, casual designs for
                    holidays and everyday wear.
                </p>
                <div className="icons-wrapper flex gap-4 mt-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-8">
                        <path
                            fill="rgba(255, 255, 255, 1.00)"
                            d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-8">
                        <path
                            fill="rgba(255, 255, 255, 1.00)"
                            d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-8">
                        <path
                            fill="rgba(255, 255, 255, 1.00)"
                            d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103l0-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"
                        />
                    </svg>
                </div>
            </div>
            <div className="lg:w-1/4 w-full mt-12 lg:mt-0">
                <p className="text-2xl font-bold">Products</p>
                <ul className="mt-5 text-xl">
                    <li>
                        <Link href={`/products?sort=new-arrivals`}>
                            New Arrival
                        </Link>
                    </li>
                    <li className="mt-6">
                        <Link href={`/products?type=Woman`}>Woman Clothes</Link>
                    </li>
                    <li className="mt-6">
                        <Link href={`/products?type=Man`}>Man Clothers</Link>
                    </li>
                </ul>
            </div>
            <div className="lg:w-1/4 w-full mt-12 lg:mt-0">
                <p className="text-2xl font-bold">About Us</p>
                <ul className="mt-5 text-xl">
                    <li>
                        <Link href="">Our Story</Link>
                    </li>
                    <li className="mt-3">
                        <Link href="">Vision & Mision</Link>
                    </li>
                    <li className="mt-3">
                        <Link href="">Brand Values</Link>
                    </li>
                    <li className="mt-3">
                        <Link href="">Contact Us</Link>
                    </li>
                </ul>
            </div>
            <div className="lg:w-1/4 w-full mt-12 lg:mt-0">
                <p className="text-2xl font-bold">Contact Us</p>
                <ul className="mt-5">
                    <li className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4">
                            <path
                                fill="rgba(255, 255, 255, 1.00)"
                                d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"
                            />
                        </svg>
                        <p>(+62) 1234567890</p>
                    </li>
                    <li className="flex items-center gap-2 mt-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4">
                            <path
                                fill="rgba(255, 255, 255, 1.00)"
                                d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"
                            />
                        </svg>
                        <p>@stellabali@gmail.com</p>
                    </li>
                    <li className="flex items-center gap-2 mt-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            className="w-4">
                            <path
                                fill="rgba(255, 255, 255, 1.00)"
                                d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                            />
                        </svg>
                        <p>Jl. lorem ipsum </p>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer
