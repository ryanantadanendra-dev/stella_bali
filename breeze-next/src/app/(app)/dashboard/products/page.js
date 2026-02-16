'use client'

import Modal from '@/components/Modal'
import { useState } from 'react'
import AddForm from '@/components/dashboard/products/AddForm'
import Table from '@/components/dashboard/products/Table'

const Products = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="w-screen min-h-screen overflow-x-hidden px-12 py-4">
                <h1 className="font-bold text-3xl">Products Page</h1>
                <svg
                    onClick={() => setIsOpen(!isOpen)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-10 mt-7">
                    <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
                <div className=" flex md:justify-center overflow-x-auto w-full">
                    <Table isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <AddForm setIsOpen={setIsOpen} />
                </Modal>
            </div>
        </>
    )
}
export default Products
