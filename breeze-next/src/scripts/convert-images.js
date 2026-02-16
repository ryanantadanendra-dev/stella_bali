const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const imagesToConvert = [
    { input: 'public/Assets/hero.png', output: 'public/Assets/hero.webp' },
    { input: 'public/Assets/cta.png', output: 'public/Assets/cta.webp' },
    {
        input: 'public/Assets/production.png',
        output: 'public/Assets/production.webp',
    },
    { input: 'public/Assets/hero1.jpg', output: 'public/Assets/hero1.webp' },
]

async function convertImages() {
    console.log('🚀 Starting image conversion...\n')

    for (const img of imagesToConvert) {
        try {
            // Check if input file exists
            if (!fs.existsSync(img.input)) {
                console.log(`⚠️  Skipped: ${img.input} (file not found)`)
                continue
            }

            // Convert to WebP
            await sharp(img.input)
                .webp({ quality: 80, effort: 6 })
                .toFile(img.output)

            const inputStats = fs.statSync(img.input)
            const outputStats = fs.statSync(img.output)
            const savedBytes = inputStats.size - outputStats.size
            const savedPercent = ((savedBytes / inputStats.size) * 100).toFixed(
                1,
            )

            console.log(
                `✅ ${path.basename(img.input)} → ${path.basename(img.output)}`,
            )
            console.log(
                `   Original: ${(inputStats.size / 1024).toFixed(1)} KB`,
            )
            console.log(`   WebP: ${(outputStats.size / 1024).toFixed(1)} KB`)
            console.log(
                `   Saved: ${(savedBytes / 1024).toFixed(1)} KB (${savedPercent}%)\n`,
            )
        } catch (error) {
            console.error(`❌ Error converting ${img.input}:`, error.message)
        }
    }

    console.log('✨ Image conversion complete!')
}

convertImages()
