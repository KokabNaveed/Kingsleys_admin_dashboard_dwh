import React from 'react'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import RecentOrdersTable from '../components/RecentOrdersTable'
import {
  statCards,
  weekLabels,
  monthLabels,
  revenueByPeriod,
  ordersByPeriod
} from '../data/mockData'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <>
      <div className="stats-grid">
        {statCards.map((card) => (
          <StatCard key={card.id} value={card.value} label={card.label} icon={card.icon} />
        ))}
      </div>

      <div className="charts-row">
        <ChartCard
          title="Revenue Overview"
          type="line"
          datasetLabel="Revenue ($)"
          color="#C41E3A"
          fillColor="rgba(196,30,58,0.08)"
          dataByPeriod={revenueByPeriod}
          labelsByPeriod={{ weekly: weekLabels, monthly: monthLabels }}
        />
        <ChartCard
          title="Order Trends"
          type="bar"
          datasetLabel="Orders"
          color="#F5B041"
          fillColor="rgba(245,176,65,0.2)"
          dataByPeriod={ordersByPeriod}
          labelsByPeriod={{ weekly: weekLabels, monthly: monthLabels }}
        />
      </div>

      <RecentOrdersTable />
    </>
  )
}
