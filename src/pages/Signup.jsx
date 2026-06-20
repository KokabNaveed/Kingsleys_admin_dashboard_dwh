import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout, { AuthLink } from '../layouts/AuthLayout'
import { useAuth } from '../context/AuthContext'
import './AuthForm.css'

const initialForm = { name: '', email: '', password: '', confirmPassword: '' }

function passwordStrength(password) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score // 0-4
}

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const strength = passwordStrength(form.password)
  const strengthLabels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['#dc2626', '#dc2626', '#f5b041', '#22c55e', '#16a34a']

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Password is required.'
    else if (form.password.length < 6) next.password = 'Use at least 6 characters.'
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.'
    if (!agreed) next.agreed = 'You must accept the terms to continue.'
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
    setTimeout(() => {
      const result = signup({ name: form.name, email: form.email, password: form.password })
      setIsSubmitting(false)
      if (!result.ok) {
        setServerError(result.message)
        return
      }
      navigate('/', { replace: true })
    }, 400)
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up admin access for your Kingsleys Chicken stores."
      footer={
        <>
          Already have an account? <AuthLink to="/login">Sign in</AuthLink>
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
          <label htmlFor="name">Full name</label>
          <div className="input-wrap">
            <i className="fas fa-user input-icon" aria-hidden="true"></i>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'has-error' : ''}
            />
          </div>
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="signup-email">Email address</label>
          <div className="input-wrap">
            <i className="fas fa-envelope input-icon" aria-hidden="true"></i>
            <input
              id="signup-email"
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
          <label htmlFor="signup-password">Password</label>
          <div className="input-wrap">
            <i className="fas fa-lock input-icon" aria-hidden="true"></i>
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a password"
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
          {form.password && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    style={{
                      height: 4,
                      flex: 1,
                      borderRadius: 2,
                      background: i < strength ? strengthColors[strength] : '#e2e8f0'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {strengthLabels[strength]}
              </span>
            </div>
          )}
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="input-wrap">
            <i className="fas fa-lock input-icon" aria-hidden="true"></i>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'has-error' : ''}
            />
          </div>
          {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group" style={{ gap: 4 }}>
          <label className="checkbox-row">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed((v) => !v)} />
            I agree to the Terms of Service and Privacy Policy
          </label>
          {errors.agreed && <span className="field-error">{errors.agreed}</span>}
        </div>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <i className="fas fa-circle-notch fa-spin" aria-hidden="true"></i> Creating account...
            </>
          ) : (
            <>
              Create Account <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  )
}
