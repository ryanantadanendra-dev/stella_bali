import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import '@/app/global.css'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
})

const montserratAlternates = Montserrat_Alternates({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-montserrat-alternates',
})

export const metadata = {
    title: {
        default: 'Stella Bali - Sustainable Handmade Fashion',
        template: '%s | Stella Bali',
    },
    description: 'Sustainable handmade fashion brand from Bali.',
    // Optimization: Use the metadata API for preconnects
    other: {
        rel: 'preconnect',
        url: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#ffffff', // Added for mobile browser UI consistency
}

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${montserratAlternates.variable} overflow-x-hidden antialiased`}>
            {/* Next.js handles <head> automatically. 
                Keep the manual <style> ONLY if you experience a "flash" 
                of unstyled content before global.css loads.
            */}
            <body className="overflow-x-hidden">{children}</body>
        </html>
    )
}
