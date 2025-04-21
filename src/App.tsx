import { useState } from 'react'
import { signUp, signIn, signOut, getCurrentUser } from './authService'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const { data, error } = await signUp(email, password)
    if (error) alert('Signup error: ' + error.message)
    else alert('Registered user: ' + data?.email)
  }

  const handleLogin = async () => {
    const { data, error } = await signIn(email, password)
    if (error) alert('Login error: ' + error.message)
    else alert('Logged in with session: ' + data?.access_token)
  }

  const handleLogout = async () => {
    const { error } = await signOut()
    if (error) alert('Logout error: ' + error.message)
    else alert('Logged out')
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default App
