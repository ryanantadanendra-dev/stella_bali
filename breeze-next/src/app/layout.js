// app/layout.js
import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import Script from 'next/script'
import '@/app/global.css'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
    adjustFontFallback: true,
    preload: true,
})

const montserratAlternates = Montserrat_Alternates({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-montserrat-alternates',
    adjustFontFallback: true,
    preload: true,
})

export const metadata = {
    title: {
        default: 'Stella Bali - Sustainable Handmade Fashion',
        template: '%s | Stella Bali',
    },
    description:
        'Sustainable handmade fashion brand from Bali with authentic craftsmanship',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${montserratAlternates.variable}`}>
            <head>
                {/* Preconnect - Fixed */}
                <link rel="preconnect" href="http://localhost:8000" />
                <link rel="dns-prefetch" href="http://localhost:8000" />

                {/* CRITICAL INLINE CSS - Above the fold */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                        /* Critical Reset */
                        *, *::before, *::after {
                            box-sizing: border-box;
                            margin: 0;
                            padding: 0;
                        }
                        
                        /* Critical Typography */
                        html {
                            font-family: var(--font-montserrat), system-ui, -apple-system, sans-serif;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }
                        
                        body {
                            line-height: 1.5;
                            min-height: 100vh;
                            overflow-x: hidden;
                            background: #fff;
                            color: #000;
                        }
                        
                        /* Prevent Navbar CLS */
                        nav {
                            width: 100vw;
                            height: 5rem;
                            background: white;
                            position: fixed;
                            top: 0;
                            z-index: 50;
                            display: flex;
                            align-items: center;
                        }
                        
                        /* Prevent Main Content CLS */
                        main {
                            min-height: 100vh;
                            padding-top: 5rem;
                        }
                        
                        /* Product Grid - Prevent CLS */
                        .product-card {
                            width: 20rem;
                            min-height: 30rem;
                            background: white;
                        }
                        
                        .product-image-container {
                            width: 100%;
                            aspect-ratio: 4/5;
                            background: #f3f4f6;
                            position: relative;
                            overflow: hidden;
                        }
                        
                        /* Sidebar - Prevent CLS */
                        aside {
                            width: 20rem;
                            min-height: 100vh;
                            background: white;
                        }
                        
                        @media (max-width: 768px) {
                            aside {
                                width: 8rem;
                            }
                        }
                        
                        /* Image optimization */
                        img {
                            display: block;
                            max-width: 100%;
                            height: auto;
                        }
                        
                        /* Loading skeleton */
                        .skeleton {
                            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                            background-size: 200% 100%;
                            animation: pulse 2s ease-in-out infinite;
                        }
                        
                        @keyframes pulse {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }
                    `,
                    }}
                />
            </head>
            <body className={montserrat.className}>
                {children}

                {/* Non-critical CSS - Deferred */}
                <link
                    rel="stylesheet"
                    href="/_next/static/css/app/layout.css"
                    media="print"
                    onLoad="this.media='all';this.onload=null;"
                />
                <noscript>
                    <link
                        rel="stylesheet"
                        href="/_next/static/css/app/layout.css"
                    />
                </noscript>
            </body>
        </html>
    )
}
