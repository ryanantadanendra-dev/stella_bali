'use client'

import { useState } from 'react'
import { useBlog } from '@/hooks/blog'
import Swal from 'sweetalert2'

const AddForm = ({ setIsOpen }) => {
    const { add } = useBlog()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        image: null,
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleFileChange = e => {
        const file = e.target.files[0]
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

        if (!ALLOWED_TYPES.includes(file.type)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'File Must Be JPG, JPEG, Or PNG',
            })

            e.target.value = null

            setFormData({
                ...formData,
                image: null,
            })
        }

        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'File Must Be Under 2mb',
            })

            e.target.value = null

            setFormData({
                ...formData,
                image: null,
            })
        }

        if (file) {
            {
                setFormData({
                    ...formData,
                    image: file,
                })
            }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setIsLoading(true)

            const response = await add(formData)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Added Product Successfully!',
            })

            setFormData({
                title: '',
                subtitle: '',
                content: '',
                image: null,
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
            <h2 className="text-center text-2xl font-bold">Add Blog</h2>

            <ul className="mt-8">
                <li className="flex items-center">
                    <label htmlFor="title" className="w-32">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.name}
                        onChange={handleChange}
                        className="ms-3 w-full"
                    />
                </li>
                <li className="mt-8 flex">
                    <label htmlFor="subtitle" className="w-32">
                        Subtitle
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
                    <label htmlFor="content" className="w-32">
                        Content
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={handleChange}
                        name="content"
                    />
                </li>
                <li className="mt-8 flex">
                    <label htmlFor="image" className="w-32">
                        Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="images"
                        onChange={handleFileChange}
                        className="w-full ms-3"
                    />
                </li>
                <li className="mt-9 flex justify-center">
                    <button type="submit" className="px-10 py-5 bg-gray-200">
                        {isLoading ? 'Adding. . .' : 'Add'}
                    </button>
                </li>
            </ul>
        </form>
    )
}
export default AddForm
