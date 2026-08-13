import React, { useEffect, useState } from 'react'
import './Tasks.css'

const API = import.meta.env.VITE_TASKS_API || 'http://localhost:5000'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('')

  async function fetchTasks() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/tasks`)
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  async function handleCreate(e) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const res = await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      })
      if (!res.ok) throw new Error('Create failed')
      setTitle('')
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function toggleComplete(task) {
    try {
      const res = await fetch(`${API}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      })
      if (!res.ok) throw new Error('Update failed')
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="card tasks-page">
      <h2>Tasks</h2>

      <form onSubmit={handleCreate} className="task-form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task title" />
        <button type="submit">Add</button>
      </form>

      {loading && <div className="muted">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className={`task-item ${t.completed ? 'done' : ''}`}>
              <label>
                <input type="checkbox" checked={!!t.completed} onChange={() => toggleComplete(t)} />
                <span className="task-title">{t.title}</span>
              </label>
              <div className="task-meta">
                <small>{t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}</small>
                <button className="btn-delete" onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Tasks
