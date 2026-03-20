import Image from 'next/image'
import { getBlogs } from '@/lib/getBlog'

export async function generateMetadata({ params }) {
    const { blogs } = await getBlogs()
    const blog = blogs?.find(b => b.slug === params.slug)
    const imageUrl = blog?.image
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog?.image}`
        : `https://stellabali.com/public/Assets/Logo.png`

    if (!blog) return { title: 'Not found' }

    return {
        title: blog?.title + ' | Stella Bali Blog',
        description: blog?.subtitle || `Read More About ${blog?.title}`,
        openGraph: {
            title: blog?.title,
            description: blog?.subtitle,
            siteName: 'Stella Bali',
            type: 'article',
            publishedTime: blog?.created_at,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: blog?.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: blog?.title,
            description: blog?.subtitle,
            images: [imageUrl],
        },
    }
}

export default async function Blog({ params, searchParams }) {
    const { blogs } = await getBlogs()
    const blog = blogs?.find(b => b.slug === params.slug)
    const search = await searchParams
    const lang = search?.lang || 'en'

    const formatedDate = new Date(blog?.created_at).toLocaleDateString(
        lang == 'en' ? 'en-US' : 'id-ID',
        {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        },
    )

    if (!blog) return <h1>Not found</h1>

    return (
        <article className="blog-wrapper w-screen min-h-screen py-28 text-black">
            <header className="px-32">
                <h1 className="text-4xl md:text-5xl text-center font-extrabold">
                    {lang == 'en' ? blog?.title : blog?.title_ina}
                </h1>
                <p className="text-center text-xl md:text-2xl mt-3">
                    {lang == 'en' ? blog?.subtitle : blog?.subtitle_ina}
                </p>
                <time className="block text-center text-gray-400 text-[1rem] mt-10">
                    {formatedDate}
                </time>
            </header>
            <main className="">
                <figure className="relative w-[20rem] md:w-[45rem] lg:w-[59rem] md:h-96 h-64 mx-auto mt-10">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog?.image}`}
                        alt={`${blog?.title} image`}
                        fill
                        sizes="100px"
                        priority
                        className="object-cover"
                    />
                </figure>
                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            lang == 'en' ? blog?.content : blog?.content_ina,
                    }}
                    className="content max-w-full px-8 md:px-12 lg:px-32 mt-12"
                />
            </main>
        </article>
    )
}
