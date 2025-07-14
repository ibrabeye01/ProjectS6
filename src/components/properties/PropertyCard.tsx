import React from 'react'
import { MapPin, Bed, Bath, Square, Eye, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { formatCFA } from '../../utils/currency'
import { MockProperty } from '../../data/mockData'
import { useAuthStore } from '../../stores/authStore'

interface PropertyCardProps {
  property: MockProperty
  onView: (property: MockProperty) => void
  onEdit: (property: MockProperty) => void
  onDelete: (property: MockProperty) => void
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onView,
  onEdit,
  onDelete
}) => {
  const { profile } = useAuthStore()
  const canEdit = profile?.role === 'admin' || profile?.role === 'agent'

  const statusColors = {
    disponible: 'bg-green-100 text-green-800',
    loué: 'bg-blue-100 text-blue-800',
    vendu: 'bg-gray-100 text-gray-800',
    en_négociation: 'bg-yellow-100 text-yellow-800'
  }

  const statusLabels = {
    disponible: 'Disponible',
    loué: 'Loué',
    vendu: 'Vendu',
    en_négociation: 'En négociation'
  }

  const typeLabels = {
    appartement: 'Appartement',
    maison: 'Maison',
    terrain: 'Terrain',
    bureau: 'Bureau',
    commerce: 'Commerce'
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images?.[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[property.status]}`}>
            {statusLabels[property.status]}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-sm font-bold text-emerald-700">
            {formatCFA(property.price)}
          </span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-sm text-gray-600">
              {typeLabels[property.type]}
            </p>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {property.location}, {property.region}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {property.surface && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.surface} m²</span>
              </div>
            )}
            {property.bedrooms > 0 && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {property.description}
          </p>

          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={() => onView(property)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
            {canEdit && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEdit(property)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDelete(property)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}