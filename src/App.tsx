import { useState } from 'react'
import { signUp, signIn, signOut } from './authService'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Label } from './components/ui/label'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await signUp(email, password)
      if (error) alert('Signup error: ' + error.message)
      else alert('Registered user: ' + data?.email)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await signIn(email, password)
      if (error) alert('Login error: ' + error.message)
      else alert('Logged in with session: ' + data?.access_token)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const { error } = await signOut()
      if (error) alert('Logout error: ' + error.message)
      else alert('Logged out')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Sign in or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>
              <Button variant="outline" onClick={handleRegister} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Create Account'}
              </Button>
              <Button variant="ghost" onClick={handleLogout} disabled={isLoading}>
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
