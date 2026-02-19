import { useProduct } from '@/hooks/product'
import { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2'

const AddImageForm = ({ productId, setIsOpen }) => {
    const { addImage } = useProduct()
    const [formData, setFormData] = useState({
        images: [],
    })
    const [isLoading, setIsLoading] = useState(false)
    const [id, setid] = useState()
    const inputRef = useRef(null)

    useEffect(() => {
        if (productId) {
            setid(productId)
        }
    }, [productId])

    const handleFileChange = e => {
        const files = Array.from(e.target.files)
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

        const isValid = files.every(file => ALLOWED_TYPES.includes(file.type))

        if (!isValid) {
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

        if (files?.some(file => file.size > 2 * 1024 * 1024)) {
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

        if (files) {
            {
                setFormData({
                    ...formData,
                    images: files,
                })
            }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await addImage(id, formData)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Added Product Successfully!',
            })

            setFormData({
                ...formData,
                images: [],
            })

            if (fileRef.current) {
                fileRef.current.value = ''
            }

            setIsOpen(false)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data.message,
            })
            setFormData({
                ...formData,
                images: [],
            })

            if (fileRef.current) {
                fileRef.current.value = ''
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="py-4 flex flex-col items-center justify-around h-full">
            <h2 className="text-center text-2xl font-bold">Add Image</h2>

            <li className="mt-4 flex">
                <label htmlFor="images[]" className="w-32">
                    Images
                </label>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    name="images[]"
                    onChange={handleFileChange}
                    className="w-full ms-3"
                />
            </li>
            <button type="submit" className="px-10 py-5 bg-gray-200">
                {isLoading ? 'Adding. . .' : 'Add'}
            </button>
        </form>
    )
}
export default AddImageForm
