function Header({ name, themeColor, subtitle }) {
  return (
    <header className="hero" style={{ backgroundColor: themeColor }}>
      <p className="hero__eyebrow">Student Portfolio</p>
      <h1>Hi, I’m {name}</h1>
      <p className="hero__subtitle">{subtitle}</p>
    </header>
  )
}

export default Header
