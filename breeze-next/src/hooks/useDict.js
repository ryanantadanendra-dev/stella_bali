'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const DictContext = createContext(null)

export const DictProvider = ({ dict: initialDict, children }) => {
    const searchParams = useSearchParams()
    const lang = searchParams.get('lang') || 'en'
    const [currentDict, setCurrentDict] = useState(initialDict)

    useEffect(() => {
        const fetchDict = async () => {
            const res = await fetch(`/api/dict?lang=${lang}`)
            const data = await res.json()
            setCurrentDict(data)
        }
        fetchDict()
    }, [lang])

    return (
        <DictContext.Provider value={currentDict}>
            {children}
        </DictContext.Provider>
    )
}

export const useDict = () => useContext(DictContext)
