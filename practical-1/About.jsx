function About({ bio, highlight }) {
  return (
    <section id="about" className="card">
      <h2>About Me</h2>
      <p>{bio}</p>
      <p className="card__highlight">{highlight}</p>
    </section>
  )
}

export default About
