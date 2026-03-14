'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const DictContext = createContext(null)

export const DictProvider = ({ dict, children }) => {
    const [currentDict, setCurrentDict] = useState(dict)

    useEffect(() => {
        console.log('dict prop changed:', dict) // ✅ does this log in browser?
        setCurrentDict(dict)
    }, [dict])

    return (
        <DictContext.Provider value={currentDict}>
            {children}
        </DictContext.Provider>
    )
}

export const useDict = () => useContext(DictContext)
