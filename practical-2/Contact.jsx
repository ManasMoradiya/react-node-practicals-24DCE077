import { useState } from 'react'

function Contact() {
  const [message, setMessage] = useState('')
  const [showHelp, setShowHelp] = useState(true)

  return (
    <section className="card contact-card">
      <h2>Contact Me</h2>
      <p>Feel free to leave a message for me.</p>

      <label className="contact-label" htmlFor="message">
        Your message
      </label>
      <input
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />

      <p className="char-count">Characters: {message.length}</p>

      <button type="button" className="toggle-btn" onClick={() => setShowHelp((prev) => !prev)}>
        {showHelp ? 'Hide Help' : 'Show Help'}
      </button>

      {showHelp && <p className="help-text">Please include your name and purpose in your message.</p>}
    </section>
  )
}

export default Contact
