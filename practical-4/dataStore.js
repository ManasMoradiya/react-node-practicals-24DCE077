const fs = require('fs')
const path = require('path')

const FILE = path.join(__dirname, '..', 'tasks.json')

function load() {
  try {
    if (!fs.existsSync(FILE)) return []
    const raw = fs.readFileSync(FILE, 'utf8')
    return JSON.parse(raw || '[]')
  } catch (err) {
    console.error('Failed to load tasks.json', err)
    return []
  }
}

function save(tasks) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2), 'utf8')
  } catch (err) {
    console.error('Failed to save tasks.json', err)
  }
}

module.exports = { load, save }
