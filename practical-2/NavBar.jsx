import { NavLink } from 'react-router-dom'

function NavBar({ links, darkMode, onToggleTheme }) {
  return (
    <nav className="navbar">
      <span className="navbar__brand">Student Portfolio</span>
      <ul className="navbar__links">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button type="button" className="theme-btn" onClick={onToggleTheme}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  )
}

export default NavBar
