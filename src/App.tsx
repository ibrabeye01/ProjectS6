import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Layout } from './components/layout/Layout'
import { AuthLayout } from './components/layout/AuthLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Pages
import { Home } from './pages/Home'
import { Properties } from './pages/Properties'
import { PropertyDetail } from './pages/PropertyDetail'
import { Services } from './pages/Services'
import { About } from './pages/About'
import { News } from './pages/News'
import { ArticleDetail } from './pages/ArticleDetail'
import { Newsletter } from './pages/Newsletter'
import { Contact } from './pages/Contact'
import { Dashboard } from './pages/Dashboard'
import { UserManagement } from './pages/UserManagement'
import { SignIn } from './pages/auth/SignIn'
import { SignUp } from './pages/auth/SignUp'

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
        
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="a-propos" element={<About />} />
            <Route path="actualites" element={<News />} />
            <Route path="actualites/:id" element={<ArticleDetail />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Routes d'authentification */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* Routes protégées */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="biens" element={<Properties />} />
            <Route path="biens/:id" element={<PropertyDetail />} />
            <Route path="utilisateurs" element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            } />
          </Route>

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App