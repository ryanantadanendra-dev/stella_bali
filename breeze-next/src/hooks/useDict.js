'use client'

import { createContext, useContext } from 'react'

const DictContext = createContext(null)

export const DictProvider = ({ dict, children }) => {
    return <DictContext.Provider value={dict}>{children}</DictContext.Provider>
}

export const useDict = () => useContext(DictContext)
