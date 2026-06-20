/**
 * Mock data
 * --------------------------------------------------------------------------
 * Swap these for real API calls (e.g. inside a useEffect + fetch, or
 * react-query) when you wire this template up to a backend.
 * --------------------------------------------------------------------------
 */

export const statCards = [
  { id: 'revenue', label: 'Total Revenue', value: '$48,290', icon: 'fa-dollar-sign' },
  { id: 'orders', label: 'Total Orders', value: '1,284', icon: 'fa-shopping-bag' },
  { id: 'customers', label: 'New Customers', value: '342', icon: 'fa-user-plus' },
  { id: 'rating', label: 'Avg Rating', value: '4.8', icon: 'fa-star' }
]

export const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const revenueByPeriod = {
  weekly: [1250, 1420, 1680, 1850, 2100, 2450, 1980],
  monthly: [9800, 11200, 10400, 13950]
}

export const ordersByPeriod = {
  weekly: [85, 92, 110, 98, 125, 142, 118],
  monthly: [620, 705, 588, 742]
}

export const monthLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']

export const recentOrders = [
  {
    id: '#KC-1001',
    customer: 'John Smith',
    items: 'Fillet Burger Meal',
    total: '$15.99',
    status: 'completed'
  },
  {
    id: '#KC-1002',
    customer: 'Sarah Johnson',
    items: 'Family Feast 8pc',
    total: '$32.99',
    status: 'preparing'
  },
  {
    id: '#KC-1003',
    customer: 'Michael Brown',
    items: 'Chicken Wrap + Chips',
    total: '$10.99',
    status: 'pending'
  },
  {
    id: '#KC-1004',
    customer: 'Emily Davis',
    items: 'Double Fillet Burger',
    total: '$13.99',
    status: 'completed'
  },
  {
    id: '#KC-1005',
    customer: 'David Wilson',
    items: 'Family Feast 12pc',
    total: '$45.99',
    status: 'completed'
  }
]

export const statusStyles = {
  completed: { label: 'Completed', bg: 'var(--success-bg)', text: 'var(--success-text)' },
  pending: { label: 'Pending', bg: 'var(--pending-bg)', text: 'var(--pending-text)' },
  preparing: { label: 'Preparing', bg: 'var(--preparing-bg)', text: 'var(--preparing-text)' }
}
