import { createContext, useContext } from 'react'

const PassContext = createContext(null)

export const PassProvider = PassContext.Provider
export const PassConsumer = PassContext.Consumer
export const usePass = () => useContext(PassContext)
