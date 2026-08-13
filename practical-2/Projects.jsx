import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'
import RepoList from './RepoList'

function Projects() {
  const GITHUB_USER = 'ManasMoradiya'

  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    async function fetchRepos() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`)
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const data = await res.json()
        if (!mounted) return
        const sorted = Array.isArray(data)
          ? data.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          : []
        // Keep only the student's portfolio repo
        const filteredByName = sorted.filter((r) => r.name === 'student-portfolio')
        setRepos(filteredByName)
      } catch (err) {
        if (!mounted) return
        setError(err.message || 'Unknown error')
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    fetchRepos()
    return () => {
      mounted = false
    }
  }, [GITHUB_USER, reloadKey])

  function handleRetry() {
    setReloadKey((k) => k + 1)
  }

  const filtered = repos.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <section className="card">
      <h2>Projects</h2>

      <div className="projects-controls">
        <label>
          Search repos:{' '}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name"
          />
        </label>
      </div>

      <div className="projects-content">
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        {!loading && !error && <RepoList repos={filtered} />}
      </div>
    </section>
  )
}

export default Projects
