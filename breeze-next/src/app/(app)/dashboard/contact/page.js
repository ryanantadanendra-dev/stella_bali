import Table from '@/components/dashboard/contact/Table'

const Contact = () => {
    return (
        <>
            <div className="w-screen min-h-screen py-4">
                <h1 className="font-bold text-3xl">Contact Page</h1>
                <div className="flex justify-center">
                    <Table />
                </div>
            </div>
        </>
    )
}
export default Contact
