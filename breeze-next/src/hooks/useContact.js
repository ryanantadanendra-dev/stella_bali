'use client'

import axios from '../lib/axios'
import { useEffect, useState } from 'react'

export function useContact() {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/dashboard/contact')
                setData(res.data.data)
            } catch (error) {
                setError(error)
            }
        }

        fetchData()
    }, [])

    return { data, error }
}
