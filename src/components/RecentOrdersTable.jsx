import React from 'react'
import { useNavigate } from 'react-router-dom'
import SectionCard from './SectionCard'
import { recentOrders, statusStyles } from '../data/mockData'
import './RecentOrdersTable.css'

export default function RecentOrdersTable() {
  const navigate = useNavigate()

  return (
    <SectionCard
      title="Recent Orders"
      action={
        <button type="button" className="btn-yellow" onClick={() => navigate('/orders/all')}>
          View All <i className="fas fa-arrow-right" aria-hidden="true"></i>
        </button>
      }
    >
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => {
              const status = statusStyles[order.status]
              return (
                <tr key={order.id}>
                  <td data-label="Order ID">{order.id}</td>
                  <td data-label="Customer">{order.customer}</td>
                  <td data-label="Items">{order.items}</td>
                  <td data-label="Total">{order.total}</td>
                  <td data-label="Status">
                    <span
                      className="status-badge"
                      style={{ background: status.bg, color: status.text }}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
