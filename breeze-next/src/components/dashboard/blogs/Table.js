'use client'

import { useBlog } from '@/hooks/blog'
import Modal from '@/components/Modal'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import EditForm from './EditForm'
import Swal from 'sweetalert2'
import EditImageForm from './EditImageForm'

const Table = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { blogs, deleteData } = useBlog()
    const [modalName, setModalName] = useState('')

    const handleDelete = async id => {
        console.log(id)

        Swal.fire({
            title: 'Are you sure to delete this blog?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async result => {
            if (result.isConfirmed) {
                setIsLoading(true)
                try {
                    await deleteData(id)

                    if (result) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your Blog has been deleted.',
                            icon: 'success',
                        })
                        setIsOpen(false)
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response?.data?.message,
                        icon: 'error',
                    })
                } finally {
                    setIsLoading(false)
                }
            }
        })
    }

    return (
        <table className="mt-12 max-w-screen">
            <thead>
                <tr>
                    <th className="lg:w-5">Id</th>
                    <th className="lg:w-16">Title</th>
                    <th className="lg:w-32">Subtitle</th>
                    <th className="lg:w-44">Content</th>
                    <th className="lg:w-72">Images</th>
                    <th className="lg:w-56">Actions</th>
                </tr>
            </thead>
            <tbody>
                {blogs?.data?.map((blog, index) => (
                    <tr
                        key={index}
                        className={`${index % 2 == 0 ? 'bg-gray-200' : 'bg-white'}`}>
                        <td className="text-center">{blog?.id}</td>
                        <td className="text-center">{blog?.title}</td>
                        <td className="text-center">{blog?.subtitle}</td>
                        <td className="text-center">{blog?.content}</td>
                        <td>
                            <figure className="w-52 h-20 relative mx-auto">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog?.image}`}
                                    fill
                                    className="object-cover"
                                />
                            </figure>
                            <svg
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                    setModalName('edit-image')
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4 mx-auto mt-3">
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                            </svg>
                        </td>
                        <td>
                            <div className="flex justify-center gap-4">
                                <svg
                                    onClick={() => {
                                        setIsOpen(!isOpen)
                                        setModalName('edit-data')
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                </svg>
                                <svg
                                    onClick={() => handleDelete(blog?.id)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="w-4">
                                    <path d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z" />
                                </svg>
                            </div>
                            {modalName == 'edit-data' ? (
                                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                                    <EditForm
                                        blog={blog}
                                        setIsOpen={setIsOpen}
                                    />
                                </Modal>
                            ) : modalName == 'edit-image' ? (
                                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                                    <EditImageForm
                                        id={blog?.id}
                                        setIsOpen={setIsOpen}
                                    />
                                </Modal>
                            ) : null}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table
