import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './components/Home'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import Projects from './components/Projects'
import Tasks from './components/Tasks'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>
      <NavBar links={navItems} darkMode={darkMode} onToggleTheme={() => setDarkMode((prev) => !prev)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer email="manas@gmail.com" github="Manas-Str" />
    </div>
  )
}

export default App
