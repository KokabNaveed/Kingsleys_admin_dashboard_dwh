import React from 'react'
import SectionCard from '../components/SectionCard'
import './GenericPage.css'

/**
 * GenericPage
 * --------------------------------------------------------------------------
 * A placeholder used for every section that doesn't have custom UI yet
 * (Orders, Menu, Customers, Reports, Settings, etc). Replace the contents
 * of any of these pages with real UI as you build out the template —
 * the routing, sidebar and topbar already work for them.
 * --------------------------------------------------------------------------
 */
export default function GenericPage({ title, icon = 'fa-cog' }) {
  return (
    <SectionCard title={title}>
      <div className="generic-empty">
        <i className={`fas ${icon}`} aria-hidden="true"></i>
        <p>This section is under development.</p>
        <span>Build your {title.toLowerCase()} interface here.</span>
      </div>
    </SectionCard>
  )
}
