'use client'

import { useEffect, useState } from 'react'
import { useBlog } from '@/hooks/blog'
import Swal from 'sweetalert2'

const EditForm = ({ blog, setIsOpen }) => {
    const { edit } = useBlog()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        title_ina: '',
        subtitle: '',
        subtitle_ina: '',
        content: '',
        content_ina: '',
    })
    const [id, setId] = useState(null)

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                title_ina: blog.title_ina,
                subtitle: blog.subtitle,
                subtitle_ina: blog.subtitle_ina,
                content: blog.content,
                content_ina: blog.content_ina,
            })
            setId(blog.id)
        }
    }, [blog])

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setIsLoading(true)

            const response = await edit(id, formData)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Blog Updated Successfully!',
            })

            setFormData({
                title: '',
                title_ina: '',
                subtitle: '',
                subtitle_ina: '',
                content: '',
                content_ina: '',
            })

            setIsOpen(false)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data.message,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="py-12 px-10">
            <h2 className="text-center text-2xl font-bold">Edit Blog</h2>

            <ul className="mt-8 max-h-96 overflow-y-scroll">
                <li className="flex items-center">
                    <label htmlFor="title" className="w-32">
                        Title (English)
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="ms-3 w-full"
                    />
                </li>
                <li className="flex items-center mt-4">
                    <label htmlFor="title_ina" className="w-32">
                        Title (Indonesia)
                    </label>
                    <input
                        type="text"
                        name="title_ina"
                        value={formData.title_ina}
                        onChange={handleChange}
                        className="ms-3 w-full"
                    />
                </li>
                <li className="mt-8 flex">
                    <label htmlFor="subtitle" className="w-32">
                        Subtitle (English)
                    </label>
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        className="ms-3 w-full h-10 border-2 border-black"
                    />
                </li>
                <li className="mt-8 flex">
                    <label htmlFor="subtitle_ina" className="w-32">
                        Subtitle (Indonesia)
                    </label>
                    <input
                        type="text"
                        name="subtitle_ina"
                        value={formData.subtitle_ina}
                        onChange={handleChange}
                        className="ms-3 w-full h-10 border-2 border-black"
                    />
                </li>
                <li className="mt-8 flex">
                    <label htmlFor="content" className="w-32">
                        Content (English)
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={handleChange}
                        name="content"
                        className="h-44 w-full"
                    />
                </li>
                <li className="mt-8 flex">
                    <label htmlFor="content_ina" className="w-32">
                        Content (Indonsia)
                    </label>
                    <textarea
                        value={formData.content_ina}
                        onChange={handleChange}
                        name="content_ina"
                        className="h-44 w-full"
                    />
                </li>
                <li className="mt-24 flex justify-center">
                    <button type="submit" className="px-10 py-5 bg-gray-200">
                        {isLoading ? 'Editing. . .' : 'Edit'}
                    </button>
                </li>
            </ul>
        </form>
    )
}
export default EditForm
