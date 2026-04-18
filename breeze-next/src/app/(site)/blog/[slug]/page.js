import Image from 'next/image'
import { getBlogs } from '@/lib/getBlog'
import { getDictionary } from '@/lib/getDictionary'
import Card from '@/components/Card'

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
    const dict = await getDictionary(lang)

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
        <>
            <article className="blog-wrapper w-screen min-h-screen py-28 text-black">
                <header className="ps-5 pe-5 lg:ps-12 lg:pe-96">
                    <h1 className="text-xl md:text-5xl font-extrabold">
                        {lang == 'en' ? blog?.title : blog?.title_ina}
                    </h1>
                    <p className="text-left text-sm md:text-2xl mt-3">
                        {lang == 'en' ? blog?.subtitle : blog?.subtitle_ina}
                    </p>
                    <time className="block text-left text-gray-400 text-[0.6rem] md:text-[1rem] mt-10">
                        {formatedDate}
                    </time>
                </header>
                <main className="">
                    <figure className="relative w-[15rem] md:w-[45rem] lg:w-[59rem] md:h-96 h-64 ms-12 mt-10">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog?.image}`}
                            alt={`${blog?.title} image`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className="object-cover"
                        />
                    </figure>
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                lang == 'en'
                                    ? blog?.content
                                    : blog?.content_ina,
                        }}
                        className="content max-w-full px-8 md:px-12 lg:ps-12 lg:pe-72 mt-12"
                    />
                </main>
            </article>
            <div className="mt-2 py-12">
                <p className="text-center">Read More</p>
                <div className="flex justify-center gap-5">
                    {blogs
                        ?.filter(b => b.title !== blog.title)
                        .slice(0, 5)
                        ?.map(blog => (
                            <Card
                                key={blog.id || blog.slug}
                                data={blog}
                                lang={lang}
                                dict={dict}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}
