import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, User, Phone, Mail } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { formatCFA } from '../utils/currency'
import { mockProperties } from '../data/mockData'

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const property = mockProperties.find(p => p.id === id)

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bien non trouvé</h2>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    )
  }

  const propertyTypes = {
    appartement: 'Appartement',
    maison: 'Maison',
    terrain: 'Terrain',
    bureau: 'Bureau',
    commerce: 'Commerce'
  }

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[property.status]}`}>
                  {statusLabels[property.status]}
                </span>
                <span className="text-gray-600">{propertyTypes[property.type]}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">
                {formatCFA(property.price)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images et détails principaux */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={property.images?.[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
              </div>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Description</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Caractéristiques */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Caractéristiques</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.surface && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Square className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <div className="font-semibold">{property.surface} m²</div>
                      <div className="text-sm text-gray-600">Surface</div>
                    </div>
                  )}
                  {property.bedrooms > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bed className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Chambres</div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bath className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Salles de bain</div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold">2024</div>
                    <div className="text-sm text-gray-600">Année</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Localisation */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Localisation</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {property.district}, {property.region}
                </div>
                <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Carte à venir</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Agent */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Contacter l'agent</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Fatou Sall</div>
                    <div className="text-sm text-gray-600">Agent immobilier</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  Prendre rendez-vous
                </Button>
                <Button variant="outline" className="w-full">
                  Ajouter aux favoris
                </Button>
                <Button variant="outline" className="w-full">
                  Partager
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}