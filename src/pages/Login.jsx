import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayout, { AuthLink } from '../layouts/AuthLayout'
import { useAuth } from '../context/AuthContext'
import './AuthForm.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    const next = {}
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Password is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    setIsSubmitting(true)
    // Simulated network delay so the loading state is visible — remove
    // this setTimeout once `login` calls a real API.
    setTimeout(() => {
      const result = login(form.email, form.password)
      setIsSubmitting(false)
      if (!result.ok) {
        setServerError(result.message)
        return
      }
      navigate(redirectTo, { replace: true })
    }, 400)
  }

  function fillDemoCredentials() {
    setForm({ email: 'admin@kingsleyschicken.com', password: 'admin123' })
    setErrors({})
    setServerError('')
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your stores, orders and team."
      footer={
        <>
          Don&apos;t have an account? <AuthLink to="/signup">Create one</AuthLink>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {serverError && (
          <div className="form-alert" role="alert">
            <i className="fas fa-circle-exclamation" aria-hidden="true"></i>
            {serverError}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <div className="input-wrap">
            <i className="fas fa-envelope input-icon" aria-hidden="true"></i>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@kingsleyschicken.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'has-error' : ''}
            />
          </div>
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <i className="fas fa-lock input-icon" aria-hidden="true"></i>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'has-error' : ''}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <div className="form-row-between">
          <label className="checkbox-row">
            <input type="checkbox" checked={remember} onChange={() => setRemember((v) => !v)} />
            Remember me
          </label>
          <a href="#forgot" onClick={(e) => e.preventDefault()} className="auth-link">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <i className="fas fa-circle-notch fa-spin" aria-hidden="true"></i> Signing in...
            </>
          ) : (
            <>
              Sign In <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </>
          )}
        </button>

        <div className="auth-divider">demo access</div>
        <p className="demo-hint">
          Use <strong>admin@kingsleyschicken.com</strong> / <strong>admin123</strong>, or{' '}
          <button
            type="button"
            onClick={fillDemoCredentials}
            style={{ background: 'none', border: 'none', color: 'var(--primary-red)', fontWeight: 600, padding: 0 }}
          >
            autofill it
          </button>
          .
        </p>
      </form>
    </AuthLayout>
  )
}
