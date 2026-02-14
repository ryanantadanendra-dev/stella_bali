import Image from 'next/image'
import { getBlogs } from '@/lib/getBlog'

export async function generateMetadata({ params }) {
    const { blogs } = await getBlogs()
    const blog = blogs?.find(b => b.slug === params.slug)

    if (!blog) return { title: 'Not found' }

    return {
        title: blog.title + ' | Bhaliera Blog',
        description: blog.subtitle,
        openGraph: {
            title: blog.title,
            description: blog.subtitle,
            images: [blog.image],
            type: 'article',
        },
    }
}

export default async function Blog({ params }) {
    const { blogs } = await getBlogs()
    console.log(blogs)
    const blog = blogs?.find(b => b.slug === params.slug)

    const formatedDate = new Date(blog?.created_at).toLocaleDateString(
        'en-US',
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
            <header>
                <h1 className="text-4xl md:text-5xl text-center font-bold">
                    {blog?.title}
                </h1>
                <p className="text-center text-[#ffffff90] text-xl md:text-2xl mt-3">
                    {blog?.subtitle}
                </p>
                <time className="block text-center text-gray-400 text-[1rem] mt-10">
                    {formatedDate}
                </time>
            </header>
            <main>
                <figure className="relative w-[20rem] md:w-[45rem] lg:w-[59rem] h-64 mx-auto mt-10">
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
                    dangerouslySetInnerHTML={{ __html: blog?.content }}
                    className="content max-w-full px-8 md:px-12 lg:px-0"
                />
            </main>
        </article>
    )
}
