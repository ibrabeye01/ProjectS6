import React from 'react'
import { Building, TrendingUp, Users, DollarSign, MapPin, Plus, Settings, BarChart3, UserCheck } from 'lucide-react'
import { StatsCard } from './StatsCard'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'
import { formatCFA } from '../../utils/currency'
import { usePropertyStore } from '../../stores/propertyStore'
import { useUserStore } from '../../stores/userStore'
import { useAuthStore } from '../../stores/authStore'
import { mockStats } from '../../data/mockData'

export const AdminDashboard: React.FC = () => {
  const { properties, fetchProperties } = usePropertyStore()
  const { users, fetchUsers } = useUserStore()
  const { profile } = useAuthStore()

  React.useEffect(() => {
    fetchProperties()
    fetchUsers()
  }, [fetchProperties, fetchUsers])

  const stats = properties.length > 0 ? {
    totalProperties: properties.length,
    availableProperties: properties.filter(p => p.status === 'disponible').length,
    soldProperties: properties.filter(p => p.status === 'vendu').length,
    rentedProperties: properties.filter(p => p.status === 'loué').length,
    totalValue: properties.reduce((sum, property) => {
      if (property.status === 'vendu' || property.status === 'loué') {
        return sum + property.price
      }
      return sum
    }, 0),
    regionStats: properties.reduce((acc, property) => {
      acc[property.region] = (acc[property.region] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  } : mockStats

  const userStats = {
    totalUsers: users.length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    agentUsers: users.filter(u => u.role === 'agent').length,
    clientUsers: users.filter(u => u.role === 'client').length
  }

  const topRegions = Object.entries(stats.regionStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const recentActivities = [
    { type: 'property', action: 'Nouveau bien ajouté', details: 'Villa moderne - Almadies', time: '2h' },
    { type: 'user', action: 'Nouvel agent inscrit', details: 'Mamadou Diallo', time: '4h' },
    { type: 'property', action: 'Bien vendu', details: 'Appartement - Plateau', time: '6h' },
    { type: 'user', action: 'Nouveau client', details: 'Awa Ndiaye', time: '8h' },
    { type: 'property', action: 'Bien mis à jour', details: 'Maison - Thiès', time: '1j' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrateur
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenue, {profile?.full_name} • Vue d'ensemble de la plateforme
          </p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={() => window.location.href = '/dashboard/biens'}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un bien
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard/utilisateurs'}>
            <UserCheck className="h-4 w-4 mr-2" />
            Gérer les utilisateurs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total des biens"
          value={stats.totalProperties}
          icon={Building}
          color="emerald"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total utilisateurs"
          value={userStats.totalUsers}
          icon={Users}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Biens vendus"
          value={stats.soldProperties}
          icon={DollarSign}
          color="amber"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Valeur totale"
          value={formatCFA(stats.totalValue)}
          icon={TrendingUp}
          color="red"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Administrateurs</p>
                <p className="text-2xl font-bold text-red-600">{userStats.adminUsers}</p>
              </div>
              <Settings className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agents</p>
                <p className="text-2xl font-bold text-blue-600">{userStats.agentUsers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clients</p>
                <p className="text-2xl font-bold text-green-600">{userStats.clientUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Biens disponibles</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.availableProperties}</p>
              </div>
              <Building className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Status Distribution */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Répartition des biens par statut</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Disponible</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalProperties > 0 ? (stats.availableProperties / stats.totalProperties) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.availableProperties}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Loué</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalProperties > 0 ? (stats.rentedProperties / stats.totalProperties) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.rentedProperties}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vendu</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalProperties > 0 ? (stats.soldProperties / stats.totalProperties) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.soldProperties}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Regions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Régions les plus actives</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRegions.map(([region, count], index) => (
                <div key={region} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-900">{region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full" 
                        style={{ width: `${stats.totalProperties > 0 ? (count / stats.totalProperties) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Activité récente</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  {activity.type === 'property' ? (
                    <Building className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Users className="h-5 w-5 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.location.href = '/dashboard/biens'}>
          <CardContent className="p-6 text-center">
            <Building className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gérer les biens</h3>
            <p className="text-gray-600 text-sm">Ajouter, modifier ou supprimer des biens immobiliers</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.location.href = '/dashboard/utilisateurs'}>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gérer les utilisateurs</h3>
            <p className="text-gray-600 text-sm">Administrer les comptes agents et clients</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Rapports</h3>
            <p className="text-gray-600 text-sm">Consulter les statistiques et analyses</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}