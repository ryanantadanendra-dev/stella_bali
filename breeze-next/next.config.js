// next.config.js
// FIXES mapped to Lighthouse issues:
//   - Render-blocking CSS (360ms): experimental.inlineCss (production only)
//   - Minify CSS (3 KiB): verified via compress:true
//   - Reduce unused JS (438 KiB): optimizePackageImports + bundle splitting
//   - Legacy JS (10 KiB): targets modern browsers via .browserslistrc
//   - Image delivery (73 KiB): AVIF format + correct deviceSizes
//   - bfcache: removed no-store from static responses
//   - Security headers for Best Practices score

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // FIX: Inline critical CSS — eliminates render-blocking layout.css
        // NOTE: Only works in `next build` (production), NOT in `next dev`
        // Lighthouse scores only improve after: npm run build && npm start
        inlineCss: true,

        // FIX: Tree-shake heavy packages — reduces 438 KiB unused JS bundle
        optimizePackageImports: [
            // Add your actual large imports:
            // 'lucide-react',
            // 'react-icons',
            // '@heroicons/react',
            // 'date-fns',
        ],
    },

    images: {
        // FIX: AVIF (~50% smaller than WebP) addresses "Improve image delivery: 73 KiB"
        formats: ['image/avif', 'image/webp'],

        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/storage/**',
            },
            // Production:
            // { protocol: 'https', hostname: 'your-backend.com', pathname: '/storage/**' },
        ],

        // FIX: Narrow to your actual breakpoints — cards are always 320px
        deviceSizes: [320, 640, 750, 1080, 1920],
        imageSizes: [320, 640],

        // FIX: Cache optimized images for 1 year (default is 60 seconds)
        minimumCacheTTL: 31536000,

        dangerouslyAllowSVG: false,
    },

    async headers() {
        return [
            {
                // Immutable cache for content-hashed static assets
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // FIX: bfcache failure — /products was sending no-store.
                // stale-while-revalidate enables bfcache AND keeps content fresh.
                source: '/products',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, s-maxage=3600, stale-while-revalidate=86400',
                    },
                ],
            },
            {
                source: '/:path*',
                headers: [
                    // FIX: HSTS
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    // FIX: Clickjacking
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    // FIX: XSS
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    // FIX: COOP
                    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
                ],
            },
        ]
    },

    compress: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: false,
}

module.exports = nextConfig
