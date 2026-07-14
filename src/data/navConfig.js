/**
 * Sidebar navigation config
 * --------------------------------------------------------------------------
 * This single array drives the sidebar, the top bar title/description,
 * AND the dashboard routes. To add a new page to the template:
 *   1. Add an entry here (with a `path`, `icon` and `description`,
 *      optionally `children`).
 *   2. Add a matching <Route> in src/App.jsx.
 * That's it — no other file needs to change.
 * --------------------------------------------------------------------------
 */
export const navSections = [
  {
    label: 'MAIN',
    items: [
      {
        label: 'Dashboard',
        icon: 'fa-tachometer-alt',
        path: '/',
        description: "Welcome back to your store."
      },
      {
        label: 'Orders',
        icon: 'fa-shopping-cart',
        children: [
          { label: 'All Orders', icon: 'fa-list', path: '/orders/all', description: 'Manage every order across all locations.' },
          { label: 'Pending Orders', icon: 'fa-clock', path: '/orders/pending', description: 'Orders waiting to be confirmed or prepared.' },
          { label: 'Completed Orders', icon: 'fa-check-circle', path: '/orders/completed', description: 'Orders that have been fulfilled and closed.' }
        ]
      },
      {
        label: 'Menu',
        icon: 'fa-utensils',
        children: [
          { label: 'All Items', icon: 'fa-hamburger', path: '/menu/items', description: 'Manage every dish on your menu.' },
          { label: 'Categories', icon: 'fa-tags', path: '/menu/categories', description: 'Organize menu items into categories.' },
          { label: 'Specials', icon: 'fa-fire', path: '/menu/specials', description: 'Manage limited-time offers and specials.' }
        ]
      },
      { label: 'Locations', icon: 'fa-store', path: '/locations', description: 'Manage your restaurant locations.' }
    ]
  },
  {
    label: 'MANAGEMENT',
    items: [
      {
        label: 'Customers',
        icon: 'fa-users',
        children: [
          { label: 'All Customers', icon: 'fa-users', path: '/customers/all', description: 'View and manage your customer base.' },
          { label: 'Loyalty Program', icon: 'fa-gem', path: '/customers/loyalty', description: 'Manage points, tiers and rewards.' }
        ]
      },
      { label: 'Staff', icon: 'fa-user-tie', path: '/staff', description: 'Manage your team members and roles.' },
      {
        label: 'Reports',
        icon: 'fa-chart-line',
        children: [
          { label: 'Sales Report', icon: 'fa-chart-bar', path: '/reports/sales', description: 'View sales performance over time.' },
          { label: 'Inventory Report', icon: 'fa-boxes', path: '/reports/inventory', description: 'Track stock levels across locations.' }
        ]
      }
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { label: 'Franchise', icon: 'fa-handshake', path: '/franchise', description: 'Manage franchise inquiries and locations.' },
      {
        label: 'Settings',
        icon: 'fa-cog',
        children: [
          { label: 'General', icon: 'fa-sliders-h', path: '/settings/general', description: 'Configure general store preferences.' },
          { label: 'Payment', icon: 'fa-credit-card', path: '/settings/payment', description: 'Configure payment methods and payouts.' },
          { label: 'Notifications', icon: 'fa-bell', path: '/settings/notifications', description: 'Configure alerts and notifications.' }
        ]
      }
    ]
  }
]

/** Flat list of every routable page (used for lookups & route generation). */
export const flatPages = navSections.flatMap((section) =>
  section.items.flatMap((item) => (item.children ? item.children : [item]))
)

/** Returns { title, description } for the topbar based on the current path. */
export function getPageMeta(pathname) {
  const match = flatPages.find((p) => p.path === pathname)
  if (match) return { title: match.label, description: match.description }
  return { title: 'Not Found', description: 'This page does not exist.' }
}
