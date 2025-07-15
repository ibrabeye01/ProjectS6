import React from 'react'
import { Building, TrendingUp, DollarSign, MapPin, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { StatsCard } from './StatsCard'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'
import { formatCFA } from '../../utils/currency'
import { usePropertyStore } from '../../stores/propertyStore'
import { useAuthStore } from '../../stores/authStore'
import { PropertyForm } from '../properties/PropertyForm'
import { MockProperty } from '../../data/mockData'
import { toast } from 'react-hot-toast'

export const AgentDashboard: React.FC = () => {
  const { properties, fetchProperties, deleteProperty } = usePropertyStore()
  const { profile } = useAuthStore()
  const [showForm, setShowForm] = React.useState(false)
  const [editingProperty, setEditingProperty] = React.useState<MockProperty | null>(null)

  React.useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // Filtrer les biens de l'agent connecté
  const agentProperties = properties.filter(p => p.agent_id === profile?.id)

  const stats = {
    totalProperties: agentProperties.length,
    availableProperties: agentProperties.filter(p => p.status === 'disponible').length,
    soldProperties: agentProperties.filter(p => p.status === 'vendu').length,
    rentedProperties: agentProperties.filter(p => p.status === 'loué').length,
    totalValue: agentProperties.reduce((sum, property) => {
      if (property.status === 'vendu' || property.status === 'loué') {
        return sum + property.price
      }
      return sum
    }, 0),
    regionStats: agentProperties.reduce((acc, property) => {
      acc[property.region] = (acc[property.region] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const topRegions = Object.entries(stats.regionStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  const handleView = (property: MockProperty) => {
    window.location.href = `/dashboard/biens/${property.id}`
  }

  const handleEdit = (property: MockProperty) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleDelete = async (property: MockProperty) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${property.title}" ?`)) {
      try {
        await deleteProperty(property.id)
        toast.success('Bien supprimé avec succès')
        fetchProperties()
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleAddProperty = () => {
    setEditingProperty(null)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  const handleFormSuccess = () => {
    handleFormClose()
    fetchProperties()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Agent
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenue, {profile?.full_name} • Gérez votre portefeuille immobilier
          </p>
        </div>
        <Button onClick={handleAddProperty}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un bien
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Mes biens"
          value={stats.totalProperties}
          icon={Building}
          color="emerald"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Disponibles"
          value={stats.availableProperties}
          icon={TrendingUp}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Vendus"
          value={stats.soldProperties}
          icon={DollarSign}
          color="amber"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Valeur portfolio"
          value={formatCFA(stats.totalValue)}
          icon={MapPin}
          color="red"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Charts and insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Status Distribution */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Répartition de mes biens</h3>
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
            <h3 className="text-lg font-semibold">Mes régions d'activité</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRegions.length > 0 ? topRegions.map(([region, count], index) => (
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
              )) : (
                <p className="text-gray-500 text-center py-4">Aucun bien ajouté pour le moment</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Properties */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Mes biens immobiliers</h3>
            <Button onClick={handleAddProperty} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau bien
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {agentProperties.length > 0 ? (
            <div className="space-y-4">
              {agentProperties.slice(0, 5).map((property) => (
                <div key={property.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-600">{property.location}, {property.region}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        property.status === 'disponible' ? 'bg-green-100 text-green-800' :
                        property.status === 'loué' ? 'bg-blue-100 text-blue-800' :
                        property.status === 'vendu' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {property.status === 'disponible' ? 'Disponible' :
                         property.status === 'loué' ? 'Loué' :
                         property.status === 'vendu' ? 'Vendu' :
                         'En négociation'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-emerald-600">{formatCFA(property.price)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleView(property)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(property)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(property)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {agentProperties.length > 5 && (
                <div className="text-center pt-4">
                  <Button variant="outline" onClick={() => window.location.href = '/dashboard/biens'}>
                    Voir tous mes biens ({agentProperties.length})
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun bien ajouté
              </h3>
              <p className="text-gray-500 mb-4">
                Commencez par ajouter votre premier bien immobilier.
              </p>
              <Button onClick={handleAddProperty}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un bien
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}