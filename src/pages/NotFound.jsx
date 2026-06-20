import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-icon">
        <i className="fas fa-drumstick-bite" aria-hidden="true"></i>
      </div>
      <h1>404</h1>
      <p>We couldn&apos;t find the page you&apos;re looking for.</p>
      <Link to="/" className="btn-primary not-found-btn">
        <i className="fas fa-arrow-left" aria-hidden="true"></i> Back to Dashboard
      </Link>
    </div>
  )
}
