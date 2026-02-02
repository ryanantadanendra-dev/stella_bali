import { useEffect, useState } from 'react'
import { useBlog } from '@/hooks/blog'
import Swal from 'sweetalert2'

const EditImageForm = ({ id, setIsOpen }) => {
    const { editImage } = useBlog()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        image: null,
    })
    const [productId, setProductId] = useState(null)

    useEffect(() => {
        if (id) {
            setProductId(id)
        }
    }, [id])

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
        setIsLoading(true)

        try {
            await editImage(id, formData)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Image Updated Successfully!',
            })

            setFormData({
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
        <form onSubmit={handleSubmit} className="px-4 py-12 h-full">
            <div className="flex flex-col justify-around items-center h-full">
                <h2 className="text-2xl font-bold">Edit Image</h2>
                <input type="file" name="image" onChange={handleFileChange} />
                <button type="submit" className="px-10 py-5 bg-gray-200">
                    {isLoading ? 'Editing. . .' : 'Edit'}
                </button>
            </div>
        </form>
    )
}
export default EditImageForm
