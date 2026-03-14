import 'server-only'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then(module => module.default),
    ina: () => import('@/dictionaries/ina.json').then(module => module.default),
}

export const hasLocale = locale => locale in dictionaries

export const getDictionary = async locale => {
    const key = hasLocale(locale) ? locale : 'en'

    try {
        const dict = await dictionaries[key]()
        return dict
    } catch (err) {
        console.error('failed to load dictionary:', err) // ✅ check for path errors
        return {}
    }
}
