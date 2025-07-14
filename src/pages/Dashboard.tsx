import React from 'react'
import { Building, TrendingUp, Calendar, DollarSign, Users, MapPin } from 'lucide-react'
import { StatsCard } from '../components/dashboard/StatsCard'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { formatCFA } from '../utils/currency'
import { usePropertyStore } from '../stores/propertyStore'
import { useAuthStore } from '../stores/authStore'
import { mockStats } from '../data/mockData'

export const Dashboard: React.FC = () => {
  const { properties, fetchProperties } = usePropertyStore()
  const { profile } = useAuthStore()

  React.useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // Utiliser les données fictives si pas de propriétés chargées
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

  const topRegions = Object.entries(stats.regionStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de bord
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenue, {profile?.full_name} • {profile?.role}
        </p>
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
          title="Biens disponibles"
          value={stats.availableProperties}
          icon={TrendingUp}
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
          icon={Users}
          color="red"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Charts and insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Status Distribution */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Répartition par statut</h3>
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
            {properties.slice(0, 5).map((property) => (
              <div key={property.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{property.title}</p>
                  <p className="text-sm text-gray-600">{property.location}, {property.region}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-600">{formatCFA(property.price)}</p>
                  <p className="text-sm text-gray-500">{property.status}</p>
                </div>
                <button 
                  onClick={() => window.location.href = `/biens/${property.id}`}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  Voir
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}