import { createContext, useContext, useState } from 'react'
import { translations } from '../lang'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('wc_lang') || 'bg')

  const setLang = (l) => {
    setLangState(l)
    localStorage.setItem('wc_lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
