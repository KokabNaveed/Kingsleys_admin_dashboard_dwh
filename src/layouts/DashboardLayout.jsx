import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { getPageMeta } from '../data/navConfig'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { title, description } = getPageMeta(location.pathname)

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <Sidebar isOpen={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />

        {mobileNavOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
        )}

        <main className="main-content">
          <Topbar
            title={title}
            description={description}
            onMenuClick={() => setMobileNavOpen((v) => !v)}
          />

          <div className="dashboard-content">
            <Outlet />
          </div>

          <footer className="dashboard-footer">
            <p>
              © {new Date().getFullYear()} Kingsleys Chicken. All Rights Reserved. | Designed by{' '}
              <a href="https://www.techscapesolution.com" target="_blank" rel="noreferrer">
                TechScape Solution
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
