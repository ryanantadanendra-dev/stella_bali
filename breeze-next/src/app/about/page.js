import Hero from '@/components/Hero'
import CTA from '@/components/CTA'
import Image from 'next/image'
import ProductionImg from '../../../public/Assets/production.png'
import FounderImg from '../../../public/Assets/founder.png'

const visionMissions = [
    {
        title: 'Our Vision',
        text: 'Lorem ipsum dolor sit amet consectetur. Vehicula fames in tincidunt erat id. Habitant dignissim nibh viverra diam blandit at ultricies laoreet.',
        path: 'M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z',
    },
    {
        title: 'Our Mission',
        text: 'Lorem ipsum dolor sit amet consectetur. Vitae massa netus arcu vel sed feugiat nullam in fermentum. Pellentesque non ipsum varius fringilla turpis at. Proin bibendum auctor turpis sagittis libero interdum fermentum at.',
        path: 'M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z',
    },
]

const brandValues = [
    {
        title: 'Sustainability',
        description:
            "We prioritize eco-friendly materials and processes, ensuring our fashion choices don't come at the planet's expense.",
    },
    {
        title: 'Quality',
        description:
            'Every piece is crafted with meticulous attention to detail, designed to last beyond just one summer season.',
    },
    {
        title: 'Authenticity',
        description:
            'We stay true to our Balinese roots, creating designs that genuinely reflect island culture and lifestyle.',
    },
    {
        title: 'Community',
        description:
            'We support local artisans and fair labor practices, building meaningful relationships with everyone in our supply chain.',
    },
]

const productions = [
    {
        title: 'Sustainable Materials',
        description:
            'We use organic cotton, linen, and recycled fabrics sourced from certified sustainable suppliers. Every material is carefully selected for its minimal environmental impact.',
    },
    {
        title: 'Ethical Manufacturing',
        description:
            'Our garments are produced in small batches by local artisans in Bali who receive fair wages and work in safe, respectful environments. We believe in slow fashion that values people over profit.',
    },
    {
        title: 'Zero-Waste Approach',
        description:
            'We employ pattern-making techniques that minimize fabric waste. Leftover materials are repurposed into accessories or donated to local craft communities.',
    },
]

const About = () => {
    return (
        <>
            <>
                <Hero title="About Us" />
                <main className="pt-32">
                    <section className="story w-full">
                        <h2 className="text-center text-4xl font-bold">
                            Our Story
                        </h2>
                        <article className="text-center w-[40rem] mx-auto mt-10">
                            Lorem ipsum dolor sit amet consectetur. Ultricies
                            leo ut quam nisl felis enim tempor quis. Eu sit
                            ipsum consectetur dapibus. Nunc adipiscing morbi
                            tincidunt etiam ut volutpat consectetur rutrum mi.
                            Risus massa amet tortor orci ultrices convallis.
                            Turpis cras eget a sagittis turpis. Amet.
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur. Etiam felis
                            dui bibendum venenatis tincidunt molestie tristique
                            est. Massa a lectus ultrices tempus et amet.
                            Consectetur turpis enim in donec fermentum
                            suspendisse quisque. Est volutpat leo purus lorem
                            cursus volutpat fermentum nibh.
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur. Fermentum
                            sed blandit egestas egestas donec a egestas nulla.
                            Praesent bibendum consequat orci arcu sollicitudin
                            malesuada ac egestas. Sit.
                        </article>
                    </section>
                    <section className="vision-mission w-full h-full flex justify-center gap-12 mt-40">
                        {visionMissions.map((data, index) => (
                            <div
                                key={index}
                                className="w-80 h-64 bg-white shadow-lg shadow-gray-400 flex flex-col items-center justify-around px-3">
                                <div>
                                    <div className="w-14 h-14 rounded-full bg-[#269795] mx-auto flex justify-center items-center pe-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            className="w-8 h-6">
                                            <path
                                                fill="#FFFFFF"
                                                d={data.path}
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold mt-8">
                                        {data.title}
                                    </h2>
                                </div>
                                <p className="text-center text-xs">
                                    {data.text}
                                </p>
                            </div>
                        ))}
                    </section>
                    <section className="w-full h-full mt-64">
                        <h2 className="text-3xl font-bold text-center">
                            Our Values
                        </h2>
                        <div className="flex justify-center gap-12 mt-20">
                            {brandValues.map((data, index) => (
                                <div
                                    key={index}
                                    className="w-56 h-56 bg-white relative">
                                    <span className="absolute top-0 bg-[#269795] left-1/2 -translate-x-1/2 w-16 h-1"></span>
                                    <h3 className="text-center mt-6 font-bold text-[1.2rem]">
                                        {data.title}
                                    </h3>
                                    <p className="text-center mt-4 text-[1rem]">
                                        {data.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="productions w-full h-full mt-56 flex gap-12">
                        <figure className="relative w-[50vw] h-[80vh]">
                            <Image
                                src={ProductionImg}
                                alt="Productions Image"
                                loading="lazy"
                                fill
                                className="object-cover"
                            />
                        </figure>
                        <div className="w-1/2 pe-12">
                            <h2 className="text-4xl font-bold mt-5">
                                Our Production
                            </h2>
                            <ul>
                                {productions.map((data, index) => (
                                    <li key={index} className="mt-8 ">
                                        <h2 className="text-[#269795] font-bold text-2xl">
                                            {data.title}
                                        </h2>
                                        <p className="text-[0.9rem] mt-2">
                                            {data.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <section className="productions w-full h-full mt-56 flex gap-12">
                        <div className="w-1/2 ps-12 pe-12">
                            <h2 className="text-3xl font-bold mt-5">
                                Meet Our Founder
                            </h2>
                            <h3 className="text-2xl text-[#269795] font-bold mt-12">
                                Founder Name
                            </h3>
                            <p className="mt-2 text-[1rem]">
                                Founder & Creative Director
                            </p>
                            <article className="mt-5 text-[1rem]">
                                Lorem ipsum dolor sit amet consectetur.
                                Fermentum aenean sed euismod in elit. Pharetra
                                sed a integer viverra nunc. Et pellentesque mi
                                diam turpis magnis senectus viverra egestas.
                                Duis orci at sed sed augue. Faucibus
                                sollicitudin et commodo at leo vitae ullamcorper
                                ut eget.
                                <br />
                                <br />
                                Lorem ipsum dolor sit amet consectetur.
                                Convallis amet et non iaculis urna magna
                                facilisis varius nisl. Porttitor pharetra
                                fermentum eget nullam lectus faucibus commodo.
                                Metus nunc sit arcu consectetur morbi.
                                <br />
                                <br />
                                Lorem ipsum dolor sit amet consectetur. Velit
                                diam proin sit cursus.
                            </article>
                            <p className="font-bold mt-4 text-[#404040]">
                                "Bali Breeze, Everyday Ease"
                            </p>
                        </div>
                        <figure className="relative w-[50vw] h-[80vh]">
                            <Image
                                src={FounderImg}
                                alt="Founder Image"
                                loading="lazy"
                                fill
                                className="object-cover"
                            />
                        </figure>
                    </section>
                    <CTA
                        heading="Join Our Journey"
                        subheading="Discover our latest collection and become part of the StellaBali community. Experience the perfect blend of island style and sustainable fashion."
                    />
                </main>
            </>
        </>
    )
}
export default About
