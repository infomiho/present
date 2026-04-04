import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

export type Theme = 'light' | 'dark'
export const ThemeContext = createContext<Theme>('dark')
export const useTheme = () => useContext(ThemeContext)
