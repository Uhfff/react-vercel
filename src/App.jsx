import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [users, setUsers] = useState([])

  const load = () =>
    fetch('https://node-orm.vercel.app/users')
      .then((res) => res.json())
      .then(setUsers)

  useEffect(() => {
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch('https://node-orm.vercel.app/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    setDone(true)
    load()
  }

  return (
    <>
      {done ? (
        <h2>Привет, {name}! Вы зарегистрированы</h2>
      ) : (
        <form onSubmit={submit}>
          <h2>Регистрация</h2>
          <input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
          <button>Зарегистрироваться</button>
        </form>
      )}
      <h3>Пользователи</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </>
  )
}

export default App
