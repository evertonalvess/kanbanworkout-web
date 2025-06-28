import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl space-y-4 w-full max-w-sm">
        <h1 className="text-xl font-bold">{mode === 'signin' ? 'Entrar' : 'Criar conta'}</h1>
        <input
          className="w-full p-2 rounded bg-white/5"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-white/5"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 py-2 rounded">
          {mode === 'signin' ? 'Entrar' : 'Registrar'}
        </button>
        <button
          type="button"
          className="text-sm text-blue-300 underline"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        >
          {mode === 'signin' ? 'Criar conta' : 'Fazer login'}
        </button>
      </form>
    </div>
  )
}
