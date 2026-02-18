import Hero from '@/components/Hero'
import CTA from '@/components/CTA'
import Image from 'next/image'

export const metadata = {
    title: 'About Stella Bali | Our Story, Vision & Craftsmanship',
    description:
        'Feel the Bali breeze in every thread. Stella Bali creates effortless, lightweight clothing designed for tropical living and everyday ease. Shop our island-inspired collection.',
    keywords: [
        'Stella Bali Story',
        'Visi Misi Stella Bali',
        'proses produksi pakaian',
        'brand values fashion',
        'ethical fashion Bali',
        'cerita brand lokal',
        'behind the scenes Stella Bali',
        'kualitas produksi lokal',
        'sustainable resort wear',
        'kerajinan tangan Bali',
    ],
    openGraph: {
        title: 'The Heart of Stella Bali | Crafting Everyday Ease',
        description:
            'Dari proses produksi hingga nilai yang kami pegang. Pelajari bagaimana kami menciptakan pakaian pantai yang nyaman dan berkualitas tinggi langsung dari Bali.',
        siteName: 'stellabali.com',
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The Heart of Stella Bali | Crafting Everyday Ease',
        description:
            'Dari proses produksi hingga nilai yang kami pegang. Pelajari bagaimana kami menciptakan pakaian pantai yang nyaman dan berkualitas tinggi langsung dari Bali.',
        creator: '@stellabaligroup',
        images: [],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
    },
}

const visionMissions = [
    {
        id: 'vision',
        title: 'Our Vision',
        text: 'To become a sustainable handmade fashion brand from Bali with a strong identity and competitive presence in both national and global markets.',
        path: 'M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z',
        type: 'text',
    },
    {
        id: 'mission',
        title: 'Our Mission',
        text: [
            'To create high-quality handmade fashion products that reflect Balinese local identity.',
            'To empower home-based workers through fair, collaborative, and sustainable partnerships.',
            'To prioritize ethical, responsible, and detail-oriented production processes.',
            'To continuously innovate in design while preserving local values.',
            'To support an inclusive and collaborative UMKM ecosystem.',
        ],
        path: 'M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z',
        type: 'list',
    },
]

const brandValues = [
    {
        id: 'local-handmade',
        title: 'Local & Handmade',
        description:
            'Every product is handmade by local artisans with great care for quality and detail.',
    },
    {
        id: 'community',
        title: 'Community Empowerment',
        description:
            'We are committed to empowering home-based workers and creating meaningful social impact.',
    },
    {
        id: 'quality',
        title: 'Quality & Comfort',
        description:
            'Comfort, durability, and functionality are essential in every Stella Bali collection.',
    },
    {
        id: 'collaboration',
        title: 'Collaboration',
        description:
            'Stella Bali grows through collaboration between designers, artisans, and local communities.',
    },
    {
        id: 'sustainability',
        title: 'Sustainability',
        description:
            'We strive to build a responsible and sustainable fashion practice for the long term.',
    },
]

const VisionMissionCard = ({ data }) => {
    const isList = data.type === 'list'

    return (
        <article className="h-full w-96 bg-white px-3 py-12 shadow-lg shadow-gray-400 md:h-[30rem] md:w-[30rem] md:py-2">
            <div className="mt-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#269795] pe-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-6 w-8"
                        aria-hidden="true">
                        <path fill="#FFFFFF" d={data.path} />
                    </svg>
                </div>
                <h2 className="mt-8 text-center text-xl font-bold">
                    {data.title}
                </h2>
            </div>

            {isList ? (
                <ul className="mt-5 text-[0.8rem] md:mt-10">
                    {data.text.map((item, i) => (
                        <li
                            key={i}
                            className="mb-2 text-[0.8rem] md:text-[0.9rem]">
                            • {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-10 text-left text-[0.8rem] md:text-[1rem]">
                    {data.text}
                </p>
            )}
        </article>
    )
}

const ValueCard = ({ data }) => (
    <article className="relative h-56 w-56 bg-white">
        <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 bg-[#269795]" />
        <h3 className="mt-6 text-center text-[1rem] font-bold">{data.title}</h3>
        <p className="mt-4 text-center text-[1rem]">{data.description}</p>
    </article>
)

const About = () => {
    return (
        <>
            <Hero title="About Us" />
            <main className="pt-32">
                {/* Our Story Section */}
                <section className="story w-full">
                    <h2 className="text-center text-4xl font-bold">
                        Our Story
                    </h2>
                    <article className="mx-auto mt-10 px-3 text-center text-[0.8rem] md:w-[40rem] md:text-lg">
                        Stella Bali is a local Balinese fashion brand rooted in
                        handmade craftsmanship, collaboration, and community
                        empowerment. What began as a home-based business has
                        grown into a creative UMKM that focuses on producing
                        thoughtfully designed apparel made by skilled home-based
                        artisans in Bali.
                        <br />
                        <br />
                        Each Stella Bali piece is handcrafted with attention to
                        detail, comfort, and quality. We believe fashion is more
                        than a product—it is a story shaped by people,
                        processes, and values. With a strong sense of local
                        pride, Stella Bali represents an authentic Balinese
                        brand that connects traditional craftsmanship with
                        contemporary needs.
                    </article>
                </section>

                {/* Vision & Mission Section */}
                <section className="vision-mission mt-40 flex h-full w-full flex-wrap justify-center gap-12">
                    {visionMissions.map(data => (
                        <VisionMissionCard key={data.id} data={data} />
                    ))}
                </section>

                {/* Our Values Section */}
                <section className="mt-64 h-full w-full">
                    <h2 className="text-center text-3xl font-bold">
                        Our Values
                    </h2>
                    <div className="mt-20 flex flex-wrap justify-center gap-32 md:px-12">
                        {brandValues.map(data => (
                            <ValueCard key={data.id} data={data} />
                        ))}
                    </div>
                </section>

                {/* Our Production Section */}
                <section className="productions mt-56 flex h-full w-full flex-col gap-12 lg:flex-row">
                    <figure className="relative mx-auto h-[20rem] w-[20rem] md:h-[30rem] md:w-[40rem] lg:mx-0 lg:h-[80vh] lg:w-[50vw]">
                        <Image
                            src="/Assets/production.webp"
                            alt="Stella Bali artisans at work producing handmade fashion"
                            fill
                            className="object-cover"
                            quality={80}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </figure>
                    <div className="w-full lg:w-1/2 lg:pe-12">
                        <h2 className="mt-5 text-center md:text-left text-4xl font-bold">
                            Our Production
                        </h2>
                        <article className="mt-10 px-3 text-center text-[0.8rem] md:text-[1.1rem] lg:px-0 lg:text-left">
                            <span className="font-bold">Stella Bali's </span>
                            production process is handmade and based on close
                            collaboration with home-based artisans across Bali.
                            Each stage—from material selection, pattern making,
                            cutting, and sewing to finishing—is carefully
                            monitored to ensure consistent quality.
                            <br />
                            <br />
                            We produce men's and women's apparel in limited
                            quantities to maintain craftsmanship and
                            exclusivity. Through our home-based production
                            system, Stella Bali not only creates fashion
                            products but also supports local livelihoods and
                            strengthens community-based economies.
                            <br />
                            <br />
                            As a Balinese local fashion brand, Stella Bali is
                            committed to delivering authentic, meaningful
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
    )
}

export default About
