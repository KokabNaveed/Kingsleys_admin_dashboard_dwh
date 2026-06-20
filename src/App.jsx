import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import DashboardLayout from './layouts/DashboardLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import GenericPage from './pages/GenericPage'
import NotFound from './pages/NotFound'
import { flatPages } from './data/navConfig'

export default function App() {
  // Every nav entry except the dashboard itself ("/") renders as a
  // GenericPage placeholder automatically — add real UI for a section
  // simply by swapping its <Route element> for a custom page component.
  const placeholderPages = flatPages.filter((p) => p.path !== '/')

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        {placeholderPages.map((page) => (
          <Route
            key={page.path}
            path={page.path.slice(1)}
            element={<GenericPage title={page.label} icon={page.icon} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
