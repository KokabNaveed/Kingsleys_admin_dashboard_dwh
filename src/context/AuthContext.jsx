import React, { createContext, useContext, useEffect, useState } from 'react'

/**
 * AuthContext
 * --------------------------------------------------------------------------
 * This is a lightweight, front-end-only auth simulation built so the
 * template is fully functional out of the box (no backend required).
 *
 * It persists a small "users" table and the current "session" in
 * localStorage. When you're ready to connect a real API:
 *   1. Replace the body of `login` / `signup` / `logout` with fetch calls
 *      to your backend (e.g. POST /api/auth/login).
 *   2. Store the returned auth token instead of the mock user object.
 *   3. Remove the localStorage "users table" logic — that part only
 *      exists to make signup/login work without a server.
 * --------------------------------------------------------------------------
 */

const AuthContext = createContext(null)

const SESSION_KEY = 'kingsleys_session'
const USERS_KEY = 'kingsleys_users'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Seed a demo account so the login page works the moment the project runs.
function ensureDemoUser() {
  const users = readUsers()
  if (!users.find((u) => u.email === 'admin@kingsleyschicken.com')) {
    users.push({
      name: 'Kingsleys Admin',
      email: 'admin@kingsleyschicken.com',
      password: 'admin123',
      role: 'Store Manager'
    })
    writeUsers(users)
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ensureDemoUser()
    try {
      const stored = JSON.parse(localStorage.getItem(SESSION_KEY))
      if (stored) setUser(stored)
    } catch {
      /* ignore corrupt session */
    }
    setIsLoading(false)
  }, [])

  function login(email, password) {
    const users = readUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    )
    if (!found) {
      return { ok: false, message: 'Invalid email or password.' }
    }
    const session = { name: found.name, email: found.email, role: found.role }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }

  function signup({ name, email, password, role = 'Store Manager' }) {
    const users = readUsers()
    if (users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists.' }
    }
    const newUser = { name: name.trim(), email: email.trim(), password, role }
    users.push(newUser)
    writeUsers(users)
    const session = { name: newUser.name, email: newUser.email, role: newUser.role }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const value = { user, isLoading, login, signup, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
