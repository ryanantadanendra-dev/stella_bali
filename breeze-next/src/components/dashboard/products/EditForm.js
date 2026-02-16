'use client'

import { useState, useEffect } from 'react'
import { useProduct } from '@/hooks/product'
import Swal from 'sweetalert2'

const EditForm = ({ product, setIsOpen }) => {
    const { edit } = useProduct()
    const [id, setId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        colors: ['#000000'],
        type: 'man',
        subtype: 'top',
        price: '',
    })

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                colors: Array.isArray(product.colors)
                    ? product.colors
                    : product.colors
                      ? JSON.parse(product.colors)
                      : ['#000000'],
                type: product.type,
                subtype: product.subtype,
                price: product.price,
            })
            setId(product.id)
        }
    }, [product])
    const [isLoading, setIsLoading] = useState(false)

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
                text: 'Product Updated Successfully!',
            })

            setFormData({
                name: '',
                description: '',
                colors: ['#000000'],
                type: '',
                subtype: '',
                price: '',
            })

            setIsOpen(false)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops. . .',
                text: error.response?.data?.message,
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
                        value={formData?.name}
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
                        value={formData.description}
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
                                colors: [...formData.colors, '#000000'],
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
                <li className="mt-7 flex justify-center">
                    <button type="submit" className="px-10 py-5 bg-gray-200">
                        {isLoading ? 'Editing. . .' : 'Edit'}
                    </button>
                </li>
            </ul>
        </form>
    )
}
export default EditForm
