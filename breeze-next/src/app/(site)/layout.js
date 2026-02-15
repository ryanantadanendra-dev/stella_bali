import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import Navbar from '@/components/Navbar'
import '@/app/global.css'
import Footer from '@/components/Footer'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserat',
})

const montserratAlternates = Montserrat_Alternates({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-montserrat-alternative',
})

const UserLayout = ({ children }) => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            {children}
            <Footer />
        </div>
    )
}

export const metadata = {
    title: 'Laravel',
}

export default UserLayout
