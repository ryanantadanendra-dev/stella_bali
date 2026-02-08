import { useProduct } from '@/hooks/product'
import Image from 'next/image'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Modal from '@/components/Modal'
import EditForm from './EditForm'
import AddImageForm from './AddImage'

const Table = ({ setIsOpen }) => {
    const { products, deleteData, deleteImage } = useProduct()
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState(null)
    const [productId, setProductId] = useState(null)
    const [modalName, setModalName] = useState('')

    const handleDelete = async id => {
        Swal.fire({
            title: 'Are you sure?',
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
                            text: 'Your file has been deleted.',
                            icon: 'success',
                        })
                        setIsOpen(false)
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response?.data.message,
                        icon: 'error',
                    })
                } finally {
                    setIsLoading(false)
                }
            }
        })
    }

    const handleImageDelete = async id => {
        Swal.fire({
            title: 'Are you sure to delete this Image??',
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
                    await deleteImage(id)

                    if (result) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                        })
                        setIsOpen(false)
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error,
                        icon: 'error',
                    })
                } finally {
                    setIsLoading(false)
                }
            }
        })
    }

    return (
        <table className="mt-12 w-screen">
            <thead>
                <tr>
                    <th className="lg:w-5">Id</th>
                    <th className="lg:w-16">Name</th>
                    <th className="lg:w-32">Description</th>
                    <th className="lg:w-24">Colors</th>
                    <th className="lg:w-24">Type</th>
                    <th className="lg:w-24">Subtype</th>
                    <th className="lg:w-24">Price</th>
                    <th className="lg:w-56">Images</th>
                    <th className="lg:w-56">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product, index) => (
                    <tr
                        className={`${index % 2 == 0 ? 'bg-gray-200' : 'bg-white'}`}>
                        <td className="text-center">{product.id}</td>
                        <td className="text-center">{product.name}</td>
                        <td className="text-center">{product.description}</td>
                        <td className="flex gap-2  justify-center">
                            {product?.colors?.map((color, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full border-[1px] border-black`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </td>
                        <td className="text-center">{product.type}</td>
                        <td className="text-center">{product.subtype}</td>
                        <td className="text-center">Rp.{product.price},00</td>
                        <td className="py-4 align-top">
                            <div className="max-h-40 overflow-y-auto flex flex-col items-center gap-4">
                                {product?.images?.map((image, j) => (
                                    <div
                                        key={j}
                                        className="flex flex-col items-center gap-2">
                                        <figure className="w-32 h-32 relative">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${image.path}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </figure>

                                        <svg
                                            onClick={() =>
                                                handleImageDelete(image?.id)
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            className="w-4">
                                            <path d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </td>

                        <td>
                            <div className="flex justify-center gap-4">
                                <svg
                                    onClick={() => handleDelete(product?.id)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="w-4">
                                    <path d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z" />
                                </svg>
                                <svg
                                    onClick={() => {
                                        setOpen(!open)
                                        setProduct(product)
                                        setModalName('edit')
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                </svg>
                                <svg
                                    onClick={() => {
                                        setOpen(!open)
                                        setModalName('add-image')
                                        setProductId(product?.id)
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="w-4">
                                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z" />
                                </svg>
                            </div>
                        </td>
                    </tr>
                ))}
                <Modal isOpen={open} setIsOpen={setOpen}>
                    {modalName == 'edit' ? (
                        <EditForm product={product} setIsOpen={setIsOpen} />
                    ) : (
                        <AddImageForm
                            productId={productId}
                            setIsOpen={setIsOpen}
                        />
                    )}
                </Modal>
            </tbody>
        </table>
    )
}
export default Table
