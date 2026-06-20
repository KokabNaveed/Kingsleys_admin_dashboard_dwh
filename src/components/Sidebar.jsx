import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navSections } from '../data/navConfig'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

function initialOpenMenu(pathname) {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.children?.some((c) => c.path === pathname)) {
        return item.label
      }
    }
  }
  return null
}

export default function Sidebar({ isOpen, onNavigate }) {
  const location = useLocation()
  const { user } = useAuth()
  const [openMenu, setOpenMenu] = useState(() => initialOpenMenu(location.pathname))

  function toggleMenu(label) {
    setOpenMenu((current) => (current === label ? null : label))
  }

  const initials = (user?.name || 'A')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-drumstick-bite" aria-hidden="true"></i>
          </div>
          <div className="logo-text">
            <h3>KINGSLEYS</h3>
            <p>Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="nav-menu" aria-label="Primary">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="nav-divider" />
            <div className="nav-label">{section.label}</div>
            <ul>
              {section.items.map((item) => {
                if (item.children) {
                  const isParentActive = item.children.some((c) => c.path === location.pathname)
                  const isOpenSubmenu = openMenu === item.label
                  return (
                    <li className="nav-item" key={item.label}>
                      <div
                        role="button"
                        tabIndex={0}
                        className={`nav-link has-submenu ${isParentActive ? 'active-parent' : ''}`}
                        onClick={() => toggleMenu(item.label)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') toggleMenu(item.label)
                        }}
                      >
                        <div className="nav-link-left">
                          <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                          <span>{item.label}</span>
                        </div>
                        <i
                          className={`fas fa-chevron-down chevron ${isOpenSubmenu ? 'rotated' : ''}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className={`submenu ${isOpenSubmenu ? 'open' : ''}`}>
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={onNavigate}
                          >
                            <div className="nav-link-left">
                              <i className={`fas ${child.icon}`} aria-hidden="true"></i>
                              <span>{child.label}</span>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    </li>
                  )
                }
                return (
                  <li className="nav-item" key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      onClick={onNavigate}
                    >
                      <div className="nav-link-left">
                        <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                        <span>{item.label}</span>
                      </div>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{initials}</div>
          <div className="user-details">
            <h4>{user?.name || 'Kingsleys Admin'}</h4>
            <p>{user?.role || 'Store Manager'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
