import { useProduct } from '@/hooks/product'
import { useState } from 'react'
import Swal from 'sweetalert2'

const AddForm = ({ setIsOpen }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { add } = useProduct()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        colors: ['#000000'],
        type: 'man',
        subtype: 'top',
        price: '',
        images: [],
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

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

        console.log(formData)

        try {
            await add(formData)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Added Product Successfully!',
            })

            setFormData({
                name: '',
                description: '',
                colors: ['#000000'],
                type: '',
                subtype: '',
                price: '',
                images: [],
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
        <form onSubmit={handleSubmit} className="py-3 px-10">
            <h2 className="text-center text-2xl font-bold">Add Product</h2>

            <ul className="mt-8">
                <li className="flex items-center">
                    <label htmlFor="name" className="w-32">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="ms-3 w-full"
                    />
                </li>
                <li className="mt-4 flex">
                    <label htmlFor="description" className="w-32">
                        Description
                    </label>
                    <input
                        type="description"
                        name="description"
                        onChange={handleChange}
                        className="ms-3 w-full h-10 border-2 border-black"
                    />
                </li>
                <li className="mt-4">
                    <label htmlFor="colors[]" className="">
                        Colors
                    </label>
                    {formData.colors.map((color, index) => (
                        <>
                            <input
                                key={index}
                                type="color"
                                value={color}
                                onChange={e => {
                                    const updated = [...formData.colors]
                                    updated[index] = e.target.value

                                    setFormData({
                                        ...formData,
                                        colors: updated,
                                    })
                                }}
                                className="w-16 h-8 mr-2 ms-4 border-2 border-black rounded-lg"
                            />

                            {formData.colors.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = formData.colors.filter(
                                            (_, i) => i !== index,
                                        )
                                        setFormData({
                                            ...formData,
                                            colors: updated,
                                        })
                                    }}
                                    className="text-red-500">
                                    ✕
                                </button>
                            )}
                        </>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                ...formData,
                                colors: [...formData.colors, ''],
                            })
                        }
                        className="text-blue-500">
                        + Add color
                    </button>
                </li>

                <li className="mt-4 flex">
                    <label htmlFor="type" className="w-32">
                        Type
                    </label>
                    <select
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full ms-3">
                        <option value="man">Man</option>
                        <option value="woman">Woman</option>
                    </select>
                </li>

                <li className="mt-4 flex">
                    <label htmlFor="subtype" className="w-32">
                        Subtype
                    </label>
                    <select
                        name="subtype"
                        id="subtype"
                        value={formData.subtype}
                        onChange={handleChange}
                        className="w-full ms-3">
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="swimwear">Swimwear</option>
                        <option value="outerwear">Outerwear</option>
                        <option value="footwear">Footwear</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </li>
                <li className="mt-4 flex">
                    <label htmlFor="price" className="w-32">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full ms-3"
                    />
                </li>
                <li className="mt-4 flex">
                    <label htmlFor="images[]" className="w-32">
                        Images
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        name="images[]"
                        onChange={handleFileChange}
                        className="w-full ms-3"
                    />
                </li>
                <li className="mt-4 flex justify-center">
                    <button type="submit" className="px-10 py-5 bg-gray-200">
                        {isLoading ? 'Adding. . .' : 'Add'}
                    </button>
                </li>
            </ul>
        </form>
    )
}
export default AddForm
