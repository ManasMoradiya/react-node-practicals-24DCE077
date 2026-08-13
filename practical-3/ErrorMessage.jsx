import React from 'react'

function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="error-message">
      <p>Something went wrong: {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-retry">
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
