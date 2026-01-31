module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extends: {
            fontFamily: {
                montseratAlternative: ['var(--font-montserat-alternative)'],
                montserat: ['var(--font-montserat)'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
