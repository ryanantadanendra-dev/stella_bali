import Header from '@/app/(app)/Header'
import DashboardCard from '@/components/DashboardCard'

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-12 flex justify-center gap-6">
                    <DashboardCard>
                        <h2>Products</h2>
                    </DashboardCard>
                    <DashboardCard>
                        <h2>Blogs</h2>
                    </DashboardCard>
                    <DashboardCard>
                        <h2>Contacts</h2>
                    </DashboardCard>
                </div>
            </div>
        </>
    )
}

export default Dashboard
