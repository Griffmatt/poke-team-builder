import { useThemeContext } from '../../Context/themeContext'

export default function DarkModeButton() {
  const { darkMode, handleDarkMode } = useThemeContext()
  return (
    <button
      onClick={handleDarkMode}
      className="bg-transparent text-dark dark:text-light"
    >
      {darkMode ? 'Light' : 'Dark'}
    </button>
  )
}
