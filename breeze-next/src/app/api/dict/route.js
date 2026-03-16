import { getDictionary } from '@/lib/getDictionary'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const dict = await getDictionary(lang)
    return Response.json(dict)
}
