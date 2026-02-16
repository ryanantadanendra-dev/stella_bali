'use client'

import Modal from '@/components/Modal'
import { useContact } from '@/hooks/contact'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const Table = () => {
    const { contact, edit, isLoading } = useContact()
    const [isOpen, setIsOpen] = useState(false)
    const [cId, setCId] = useState(null)
    const [formData, setFormData] = useState({
        phone: '',
    })

    useEffect(() => {
        if (contact) {
            setFormData({
                phone: contact?.data[0]?.phone,
            })
        }
    }, [contact])

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e, id) => {
        e.preventDefault()

        try {
            await edit(id, formData)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Contact Updated Successfully!',
            })

            setFormData({
                phone: '',
            })

            setIsOpen(false)
        } catch (error) {
        } finally {
        }
    }

    return (
        <table className="mt-12 max-w-screen">
            <thead>
                <tr>
                    <th className="lg:w-96">Phone</th>
                    <th className="lg:w-96">Updated At</th>
                    <th className="lg:w-32">Action</th>
                </tr>
            </thead>
            <tbody>
                {contact.data.length > 0 ? (
                    contact?.data.map((c, index) => (
                        <tr>
                            <td className="text-center">{c?.phone}</td>
                            <td className="text-center">{c.updated_at}</td>
                            <td>
                                <svg
                                    onClick={() => {
                                        setIsOpen(!isOpen)
                                        setCId(c.id)
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4 mx-auto">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                </svg>
                            </td>
                        </tr>
                    ))
                ) : (
                    <p className="text-center">No Data Yet!</p>
                )}
            </tbody>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <form onSubmit={e => handleSubmit(e, cId)} className="h-full">
                    <div className="flex flex-col justify-around items-center h-full">
                        <h2 className="text-2xl font-bold">Edit Contact</h2>
                        <div>
                            <label htmlFor="phone">New Phone Number</label>
                            <input
                                required
                                type="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                                className="block border-black border-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-10 py-5 bg-gray-200">
                            {isLoading ? 'Editing. . .' : 'Edit'}
                        </button>
                    </div>
                </form>
            </Modal>{' '}
        </table>
    )
}
export default Table
