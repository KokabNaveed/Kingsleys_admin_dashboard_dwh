import React from 'react'
import './SectionCard.css'

/**
 * SectionCard
 * --------------------------------------------------------------------------
 * Shared "white card with a header row" shell used by the recent orders
 * table, the generic placeholder pages, and any new page you build.
 * --------------------------------------------------------------------------
 */
export default function SectionCard({ title, action, children }) {
  return (
    <div className="section-card">
      <div className="section-card-header">
        <h3>{title}</h3>
        {action}
      </div>
      <div className="section-card-body">{children}</div>
    </div>
  )
}
