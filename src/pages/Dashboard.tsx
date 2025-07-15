import React from 'react'
import { useAuthStore } from '../stores/authStore'
import { AdminDashboard } from '../components/dashboard/AdminDashboard'
import { AgentDashboard } from '../components/dashboard/AgentDashboard'
import { ClientDashboard } from '../components/dashboard/ClientDashboard'

export const Dashboard: React.FC = () => {
  const { profile } = useAuthStore()

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder au dashboard.</p>
        </div>
      </div>
    )
  }

  switch (profile.role) {
    case 'admin':
      return <AdminDashboard />
    case 'agent':
      return <AgentDashboard />
    case 'client':
      return <ClientDashboard />
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rôle non reconnu</h2>
            <p className="text-gray-600">Contactez l'administrateur pour résoudre ce problème.</p>
          </div>
        </div>
      )
  }
}