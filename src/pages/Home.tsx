import React from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, TrendingUp, Users, Building, Star, ArrowRight, Bed, Bath, Square, Eye } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { formatCFA } from '../utils/currency'
import { mockProperties } from '../data/mockData'

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('')

  // Sélectionner quelques biens pour l'affichage
  const featuredProperties = mockProperties.slice(0, 6)

  const features = [
    {
      icon: Search,
      title: 'Recherche Avancée',
      description: 'Trouvez le bien immobilier parfait grâce à nos filtres intelligents et notre moteur de recherche performant.'
    },
    {
      icon: MapPin,
      title: 'Géolocalisation',
      description: 'Visualisez tous les biens sur une carte interactive et découvrez les quartiers qui vous intéressent.'
    },
    {
      icon: TrendingUp,
      title: 'Analyse de Marché',
      description: 'Accédez aux tendances du marché immobilier sénégalais et prenez des décisions éclairées.'
    },
    {
      icon: Users,
      title: 'Accompagnement Expert',
      description: 'Nos agents immobiliers expérimentés vous accompagnent à chaque étape de votre projet.'
    }
  ]

  const testimonials = [
    {
      name: 'Aminata Diop',
      role: 'Propriétaire',
      content: 'Grâce à ImmoSénégal, j\'ai trouvé l\'appartement de mes rêves à Almadies. Service exceptionnel !',
      rating: 5
    },
    {
      name: 'Moussa Ba',
      role: 'Investisseur',
      content: 'Plateforme très professionnelle. L\'équipe m\'a aidé à constituer un portefeuille immobilier rentable.',
      rating: 5
    },
    {
      name: 'Fatou Sall',
      role: 'Locataire',
      content: 'Interface intuitive et biens de qualité. J\'ai trouvé ma maison en quelques clics seulement.',
      rating: 5
    }
  ]

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Trouvez votre bien immobilier
              <span className="block text-amber-300">au Sénégal</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
              La plateforme de référence pour acheter, vendre ou louer des biens immobiliers 
              dans toutes les régions du Sénégal
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-2xl">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher par ville, quartier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 text-gray-900 text-lg"
                  />
                </div>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <Search className="h-5 w-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">Dakar</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">Thiès</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">Saly</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">Saint-Louis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">500+</div>
              <div className="text-gray-600 mt-2">Biens disponibles</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">50+</div>
              <div className="text-gray-600 mt-2">Agents experts</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">1000+</div>
              <div className="text-gray-600 mt-2">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">14</div>
              <div className="text-gray-600 mt-2">Régions couvertes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir ImmoSénégal ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous révolutionnons le marché immobilier sénégalais avec des outils modernes 
              et un service personnalisé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biens Immobiliers en Vedette
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection de biens d'exception dans les meilleures localités du Sénégal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.images?.[0] || 'public/vente-villa-avec-piscine-ngaparou-4909044200.jpg'}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                      <p className="text-sm text-gray-600 capitalize">
                        {property.type === 'appartement' ? 'Appartement' :
                         property.type === 'maison' ? 'Maison' :
                         property.type === 'terrain' ? 'Terrain' :
                         property.type === 'bureau' ? 'Bureau' : 'Commerce'}
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

                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = `/biens/${property.id}`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/auth/signup">
              <Button size="lg">
                Voir tous les biens
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de ceux qui nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer votre projet immobilier ?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de Sénégalais qui ont trouvé leur bien idéal grâce à notre plateforme
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                Créer un compte gratuit
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                Découvrir nos services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}