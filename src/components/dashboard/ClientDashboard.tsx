import React from 'react'
import { Heart, Eye, Search, MapPin, Building, TrendingUp, Star, Phone } from 'lucide-react'
import { StatsCard } from './StatsCard'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { formatCFA } from '../../utils/currency'
import { usePropertyStore } from '../../stores/propertyStore'
import { useAuthStore } from '../../stores/authStore'
import { mockProperties } from '../../data/mockData'

export const ClientDashboard: React.FC = () => {
  const { properties, fetchProperties } = usePropertyStore()
  const { profile } = useAuthStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [favorites, setFavorites] = React.useState<string[]>([])

  React.useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // Utiliser les données fictives si pas de propriétés chargées
  const availableProperties = properties.length > 0 
    ? properties.filter(p => p.status === 'disponible')
    : mockProperties.filter(p => p.status === 'disponible')

  const filteredProperties = availableProperties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.region.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    availableProperties: availableProperties.length,
    favoriteProperties: favorites.length,
    viewedProperties: 12, // Simulation
    savedSearches: 3 // Simulation
  }

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const recentlyViewed = availableProperties.slice(0, 3)
  const recommendedProperties = availableProperties.slice(3, 6)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Client
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenue, {profile?.full_name} • Trouvez votre bien immobilier idéal
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par titre, localisation, région..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Biens disponibles"
          value={stats.availableProperties}
          icon={Building}
          color="emerald"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Mes favoris"
          value={stats.favoriteProperties}
          icon={Heart}
          color="red"
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Biens consultés"
          value={stats.viewedProperties}
          icon={Eye}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Recherches sauvées"
          value={stats.savedSearches}
          icon={Search}
          color="amber"
          trend={{ value: 1, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Search className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recherche avancée</h3>
            <p className="text-gray-600 text-sm">Utilisez nos filtres pour trouver le bien parfait</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mes favoris</h3>
            <p className="text-gray-600 text-sm">Consultez vos biens favoris sauvegardés</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contacter un agent</h3>
            <p className="text-gray-600 text-sm">Obtenez des conseils personnalisés</p>
          </CardContent>
        </Card>
      </div>

      {/* Recently Viewed */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Récemment consultés</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyViewed.map((property) => (
              <div key={property.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src={property.images?.[0] || '/vente-villa-avec-piscine-ngaparou-4909044200.jpg'}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h4>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}, {property.region}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-bold">{formatCFA(property.price)}</span>
                    <Button size="sm" variant="outline" onClick={() => window.location.href = `/dashboard/biens/${property.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Properties */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-semibold">Recommandés pour vous</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProperties.map((property) => (
              <div key={property.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src={property.images?.[0] || '/maison a louer.jpeg'}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h4>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}, {property.region}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-bold">{formatCFA(property.price)}</span>
                    <Button size="sm" variant="outline" onClick={() => window.location.href = `/dashboard/biens/${property.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchTerm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              Résultats de recherche ({filteredProperties.length})
            </h3>
          </CardHeader>
          <CardContent>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={property.images?.[0] || '/appartement avec piscine.jpeg'}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      >
                        <Heart 
                          className={`h-4 w-4 ${favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h4>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.location}, {property.region}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-600 font-bold">{formatCFA(property.price)}</span>
                        <Button size="sm" variant="outline" onClick={() => window.location.href = `/dashboard/biens/${property.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-500">
                  Essayez avec d'autres mots-clés ou modifiez vos critères de recherche.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}