import React from 'react'

function Spinner() {
  return (
    <div className="spinner" aria-live="polite">
      <div className="spinner-dot" />
      <div>Loading...</div>
    </div>
  )
}

export default Spinner
