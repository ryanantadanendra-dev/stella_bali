import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import Navbar from '@/components/Navbar'
import '@/app/global.css'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserat',
})

const montserratAlternates = Montserrat_Alternates({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-montserat-alternative',
})

const RootLayout = ({ children }) => {
    return (
        <html
            lang="en"
            className={`${montserratAlternates.variable} ${montserrat.variable}`}>
            <body className="antialiased">
                <header>
                    <Navbar />
                </header>
                {children}
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Laravel',
}

export default RootLayout
