import React from 'react'
import { Link } from 'react-router-dom'
import './AuthLayout.css'

const highlights = [
  { icon: 'fa-chart-line', text: 'Real-time sales & order analytics' },
  { icon: 'fa-store', text: 'Manage every location from one place' },
  { icon: 'fa-gem', text: 'Built-in loyalty & rewards tracking' }
]

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <div className="auth-brand-glow" aria-hidden="true"></div>
        <div className="auth-brand-content">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <i className="fas fa-drumstick-bite" aria-hidden="true"></i>
            </div>
            <div>
              <h2>KINGSLEYS</h2>
              <p>Admin Dashboard</p>
            </div>
          </div>

          <h1 className="auth-headline">
            Run every store from <span>one bite-sized dashboard.</span>
          </h1>
          <p className="auth-subheadline">
            Orders, menus, locations and staff — all in one place, built for fast-moving teams.
          </p>

          <ul className="auth-highlights">
            {highlights.map((h) => (
              <li key={h.text}>
                <span className="auth-highlight-icon">
                  <i className={`fas ${h.icon}`} aria-hidden="true"></i>
                </span>
                {h.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="auth-brand-footnote">© {new Date().getFullYear()} Kingsleys Chicken</p>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-mobile-logo">
            <div className="auth-logo-icon">
              <i className="fas fa-drumstick-bite" aria-hidden="true"></i>
            </div>
            <span>KINGSLEYS</span>
          </div>

          <h2 className="auth-form-title">{title}</h2>
          {subtitle && <p className="auth-form-subtitle">{subtitle}</p>}

          {children}

          {footer && <div className="auth-form-footer">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export function AuthLink({ to, children }) {
  return (
    <Link to={to} className="auth-link">
      {children}
    </Link>
  )
}
