'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const LangBtm = ({ lang }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChange = e => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('lang', e.target.value) // hanya update lang
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <select
            onChange={handleChange}
            value={searchParams.get('lang') || lang}
            name="language"
            id="language">
            <option value="en">Eng</option>
            <option value="ina">Ina</option>
        </select>
    )
}
export default LangBtm
