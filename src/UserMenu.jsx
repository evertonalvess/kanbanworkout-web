import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'

export default function UserMenu() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const handleButton = () => {
    if (!user) {
      navigate('/login')
    } else {
      setOpen(!open)
    }
  }

  return (
    <div className="relative">
      <button onClick={handleButton} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        {user ? user.email[0].toUpperCase() : '?'}
      </button>
      {open && user && (
        <div className="absolute right-0 mt-2 w-40 bg-white/10 backdrop-blur-sm rounded shadow-md p-2 text-sm">
          <p className="px-2 py-1 truncate">{user.email}</p>
          <button onClick={() => { setOpen(false); navigate('/admin') }} className="block w-full text-left px-2 py-1 hover:bg-white/20">Admin</button>
          <button onClick={handleSignOut} className="block w-full text-left px-2 py-1 hover:bg-white/20">Sair</button>
        </div>
      )}
    </div>
  )
}
