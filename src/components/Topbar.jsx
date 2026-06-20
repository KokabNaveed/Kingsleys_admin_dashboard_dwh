import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Topbar.css'

export default function Topbar({ title, description, onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  const dateText = now.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  const timeText = now.toLocaleTimeString('en-US')

  const initials = (user?.name || 'A')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  function handleLogout() {
    setDropdownOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <button
          type="button"
          className="hamburger-btn"
          aria-label="Toggle navigation menu"
          onClick={onMenuClick}
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
        <div className="page-title">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="top-bar-actions">
        <div className="datetime-widget">
          <div className="date-box">
            <span>DATE</span>
            <br />
            <strong>{dateText}</strong>
          </div>
          <div className="time-box">
            <span>TIME</span>
            <br />
            <strong>{timeText}</strong>
          </div>
        </div>

        <div className="search-bar">
          <i className="fas fa-search" aria-hidden="true"></i>
          <input type="text" placeholder="Search orders, customers..." aria-label="Search" />
        </div>

        <button type="button" className="icon-btn" aria-label="Notifications">
          <i className="fas fa-bell" aria-hidden="true"></i>
          <span className="badge-dot"></span>
        </button>

        <div className="profile-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="profile-btn"
            onClick={(e) => {
              e.stopPropagation()
              setDropdownOpen((v) => !v)
            }}
          >
            <div className="avatar">{initials}</div>
            <span className="profile-name">{user?.name?.split(' ')[0] || 'Admin'}</span>
            <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem' }} aria-hidden="true"></i>
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            <a href="#profile" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDropdownOpen(false) }}>
              <i className="fas fa-user" aria-hidden="true"></i> My Profile
            </a>
            <a href="#settings" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDropdownOpen(false); navigate('/settings/general') }}>
              <i className="fas fa-cog" aria-hidden="true"></i> Account Settings
            </a>
            <div className="dropdown-divider" />
            <a href="#logout" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleLogout() }}>
              <i className="fas fa-sign-out-alt" aria-hidden="true"></i> Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
