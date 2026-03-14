'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LangBtm = ({ lang }) => {
    const router = useRouter()
    const [data, setData] = useState('en')

    useEffect(() => {
        router.push(`?lang=${data}`)
        router.refresh()
    }, [data])

    return (
        <select
            onChange={e => setData(e.target.value)}
            value={data}
            name="language"
            id="language">
            <option value="en">Eng</option>
            <option value="ina">Ina</option>
        </select>
    )
}
export default LangBtm
