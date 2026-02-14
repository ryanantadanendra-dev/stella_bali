import Hero from '@/components/Hero'
import CTA from '@/components/CTA'
import Image from 'next/image'
import ProductionImg from '../../../public/Assets/production.png'
import FounderImg from '../../../public/Assets/founder.png'

const visionMissions = [
    {
        title: 'Our Vision',
        text: 'To become a sustainable handmade fashion brand from Bali with a strong identity and competitive presence in both national and global markets.',
        path: 'M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z',
    },
    {
        title: 'Our Mission',
        text: [
            '•	To create high-quality handmade fashion products that reflect Balinese local identity.',
            '•	To empower home-based workers through fair, collaborative, and sustainable partnerships.',
            '•	To prioritize ethical, responsible, and detail-oriented production processes.',
            '•	To continuously innovate in design while preserving local values.',
            '•	To support an inclusive and collaborative UMKM ecosystem.',
        ],
        path: 'M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z',
    },
]

const brandValues = [
    {
        title: 'Local & Handmade',
        description:
            'Every product is handmade by local artisans with great care for quality and detail.',
    },
    {
        title: 'Community Empowerment',
        description:
            'We are committed to empowering home-based workers and creating meaningful social impact.',
    },
    {
        title: 'Quality & Comfort',
        description:
            'Comfort, durability, and functionality are essential in every Stella Bali collection.',
    },
    {
        title: 'Collaboration',
        description:
            'Stella Bali grows through collaboration between designers, artisans, and local communities.',
    },
    {
        title: 'Sustainability',
        description:
            'We strive to build a responsible and sustainable fashion practice for the long term.',
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
                            Stella Bali is a local Balinese fashion brand rooted
                            in handmade craftsmanship, collaboration, and
                            community empowerment. What began as a home-based
                            business has grown into a creative UMKM that focuses
                            on producing thoughtfully designed apparel made by
                            skilled home-based artisans in Bali.
                            <br />
                            <br />
                            Each Stella Bali piece is handcrafted with attention
                            to detail, comfort, and quality. We believe fashion
                            is more than a product—it is a story shaped by
                            people, processes, and values. With a strong sense
                            of local pride, Stella Bali represents an authentic
                            Balinese brand that connects traditional
                            craftsmanship with contemporary needs.
                        </article>
                    </section>
                    <section className="vision-mission w-full h-full flex justify-center gap-12 mt-40">
                        {visionMissions.map((data, index) => (
                            <div
                                key={index}
                                className="w-96 h-96 bg-white shadow-lg shadow-gray-400 px-3">
                                <div className="mt-10">
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
                                    <h2 className="text-xl font-bold mt-8 text-center">
                                        {data.title}
                                    </h2>
                                </div>
                                {data.title == 'Our Mission' ? (
                                    <ul className="text-[0.8rem] mt-10">
                                        {data.text.map((item, i) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : data.title == 'Our Vision' ? (
                                    <p
                                        className={` ${data.title == 'Our Vision' ? 'text-center' : 'text-left'} text-[0.8rem] mt-10`}>
                                        {data.title == 'Our Vision'
                                            ? data.text
                                            : null}
                                    </p>
                                ) : null}
                            </div>
                        ))}
                    </section>
                    <section className="w-full h-full mt-64">
                        <h2 className="text-3xl font-bold text-center">
                            Our Values
                        </h2>
                        <div className="flex justify-center flex-wrap gap-12 mt-20 px-32">
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
                            <article className="mt-10">
                                <span className="font-bold">
                                    Stella Bali’s{' '}
                                </span>
                                production process is handmade and based on
                                close collaboration with home-based artisans
                                across Bali. Each stage—from material selection,
                                pattern making, cutting, and sewing to
                                finishing—is carefully monitored to ensure
                                consistent quality.
                                <br />
                                <br />
                                We produce men’s and women’s apparel in limited
                                quantities to maintain craftsmanship and
                                exclusivity. Through our home-based production
                                system, Stella Bali not only creates fashion
                                products but also supports local livelihoods and
                                strengthens community-based economies.
                                <br />
                                <br />
                                As a Balinese local fashion brand, Stella Bali
                                is committed to delivering authentic, meaningful
                                products with positive social impact.
                            </article>
                        </div>
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
