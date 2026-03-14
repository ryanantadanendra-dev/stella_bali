import { NextResponse } from 'next/server'

export function middleware(request) {
    const lang = request.nextUrl.searchParams.get('lang') || 'en'
    const response = NextResponse.next()
    response.headers.set('x-lang', lang)
    return response
}
