import React, { useMemo, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import '../chartSetup'
import './ChartCard.css'

const periodOptions = [
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' }
]

export default function ChartCard({
  title,
  type = 'line',
  datasetLabel,
  color,
  fillColor,
  dataByPeriod,
  labelsByPeriod
}) {
  const [period, setPeriod] = useState('monthly')

  const chartData = useMemo(
    () => ({
      labels: labelsByPeriod[period],
      datasets: [
        {
          label: datasetLabel,
          data: dataByPeriod[period],
          borderColor: color,
          backgroundColor: type === 'line' ? fillColor : color,
          fill: type === 'line',
          tension: 0.4,
          borderRadius: type === 'bar' ? 8 : 0,
          pointRadius: type === 'line' ? 3 : 0,
          pointBackgroundColor: color
        }
      ]
    }),
    [period, type, datasetLabel, color, fillColor, dataByPeriod, labelsByPeriod]
  )

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#F1F5F9' }, beginAtZero: true }
      }
    }),
    []
  )

  const ChartComponent = type === 'bar' ? Bar : Line

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{title}</h3>
        <select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label={`${title} period`}>
          {periodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-canvas-wrap">
        <ChartComponent data={chartData} options={options} />
      </div>
    </div>
  )
}
