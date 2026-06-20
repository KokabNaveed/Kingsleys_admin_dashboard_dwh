import React from 'react'
import './StatCard.css'

export default function StatCard({ value, label, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
      <div className="stat-icon">
        <i className={`fas ${icon}`} aria-hidden="true"></i>
      </div>
    </div>
  )
}
