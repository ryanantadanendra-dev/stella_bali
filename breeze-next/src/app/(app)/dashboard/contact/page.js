import Table from '@/components/dashboard/contact/Table'

const Contact = () => {
    return (
        <>
            <div className="w-screen min-h-screen px-0 md:px-12 py-4">
                <h1 className="font-bold text-3xl mt-12 text-center md:text-left">
                    Contact Page
                </h1>
                <div className="flex justify-center">
                    <Table />
                </div>
            </div>
        </>
    )
}
export default Contact
