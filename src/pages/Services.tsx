import React from 'react'
import { Building, Key, TrendingUp, FileText, Users, Shield, MapPin, Calculator, Bed, Bath, Square, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { formatCFA } from '../utils/currency'
import { mockProperties } from '../data/mockData'

export const Services: React.FC = () => {
  const services = [
    {
      icon: Building,
      title: 'Vente de Biens Immobiliers',
      description: 'Accompagnement complet pour la vente de votre propriété au meilleur prix du marché.',
      features: ['Évaluation gratuite', 'Marketing digital', 'Négociation experte', 'Suivi juridique'],
      color: 'emerald'
    },
    {
      icon: Key,
      title: 'Location et Gestion Locative',
      description: 'Trouvez le locataire idéal et gérez vos biens en toute sérénité.',
      features: ['Sélection de locataires', 'Gestion des loyers', 'Maintenance', 'Assurance loyers impayés'],
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Conseil en Investissement',
      description: 'Stratégies personnalisées pour optimiser vos investissements immobiliers.',
      features: ['Analyse de rentabilité', 'Étude de marché', 'Montage financier', 'Suivi de performance'],
      color: 'amber'
    },
    {
      icon: FileText,
      title: 'Évaluation Immobilière',
      description: 'Estimation précise de la valeur de votre bien par nos experts certifiés.',
      features: ['Rapport détaillé', 'Comparaison marché', 'Photos professionnelles', 'Certification officielle'],
      color: 'red'
    },
    {
      icon: Users,
      title: 'Accompagnement Acheteurs',
      description: 'De la recherche à la signature, nous vous guidons dans votre acquisition.',
      features: ['Recherche personnalisée', 'Visites organisées', 'Négociation prix', 'Assistance juridique'],
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Sécurisation Juridique',
      description: 'Toutes vos transactions sont sécurisées par nos partenaires juridiques.',
      features: ['Vérification titres', 'Rédaction contrats', 'Suivi notarial', 'Garanties légales'],
      color: 'green'
    }
  ]

  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600'
  }

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Services Immobiliers
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Une gamme complète de services pour tous vos besoins immobiliers au Sénégal. 
            De l'achat à la vente, en passant par la location et l'investissement.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[service.color as keyof typeof colorClasses]}`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    <span onClick={() => window.location.href = '/contact'}>En savoir plus</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Processus en 4 Étapes
            </h2>
            <p className="text-xl text-gray-600">
              Une approche structurée pour garantir votre satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Analyse de vos besoins et objectifs' },
              { step: '02', title: 'Recherche', description: 'Sélection des meilleures opportunités' },
              { step: '03', title: 'Négociation', description: 'Optimisation des conditions' },
              { step: '04', title: 'Finalisation', description: 'Accompagnement jusqu\'à la signature' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Biens Immobiliers
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez notre portefeuille de biens à vendre et à louer
            </p>
          </div>

          {/* Property Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* À Vendre */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-emerald-600 mr-2" />
                Biens à Vendre
              </h3>
              <div className="space-y-6">
                {mockProperties.filter(p => p.status === 'disponible' || p.status === 'en_négociation').slice(0, 3).map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="w-32 h-24 flex-shrink-0">
                        <img
                          src={property.images?.[0] || '/vente-villa-avec-piscine-ngaparou-4909044200.jpg'}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                            {property.title}
                          </h4>
                          <span className="text-emerald-600 font-bold text-sm">
                            {formatCFA(property.price)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-xs mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{property.location}, {property.region}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          {property.surface && (
                            <div className="flex items-center">
                              <Square className="h-3 w-3 mr-1" />
                              <span>{property.surface} m²</span>
                            </div>
                          )}
                          {property.bedrooms > 0 && (
                            <div className="flex items-center">
                              <Bed className="h-3 w-3 mr-1" />
                              <span>{property.bedrooms}</span>
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center">
                              <Bath className="h-3 w-3 mr-1" />
                              <span>{property.bathrooms}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* À Louer */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Key className="h-6 w-6 text-blue-600 mr-2" />
                Biens à Louer
              </h3>
              <div className="space-y-6">
                {[
                  {
                    id: 'rent_1',
                    title: 'Appartement meublé 2 chambres - Almadies',
                    location: 'Almadies',
                    region: 'Dakar',
                    price: 850000,
                    surface: 85,
                    bedrooms: 2,
                    bathrooms: 1,
                    images: ['/appartement avec piscine.jpeg']
                  },
                  {
                    id: 'rent_2',
                    title: 'Villa avec jardin - Saly',
                    location: 'Saly',
                    region: 'Thiès',
                    price: 1200000,
                    surface: 200,
                    bedrooms: 3,
                    bathrooms: 2,
                    images: ['/maison a louer.jpeg']
                  },
                  {
                    id: 'rent_3',
                    title: 'Studio moderne - Plateau',
                    location: 'Plateau',
                    region: 'Dakar',
                    price: 450000,
                    surface: 45,
                    bedrooms: 1,
                    bathrooms: 1,
                    images: ['/maisson a vendre.jpg']
                  }
                ].map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="w-32 h-24 flex-shrink-0">
                        <img
                          src={property.images?.[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                            {property.title}
                          </h4>
                          <span className="text-blue-600 font-bold text-sm">
                            {formatCFA(property.price)}/mois
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-xs mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{property.location}, {property.region}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          {property.surface && (
                            <div className="flex items-center">
                              <Square className="h-3 w-3 mr-1" />
                              <span>{property.surface} m²</span>
                            </div>
                          )}
                          {property.bedrooms > 0 && (
                            <div className="flex items-center">
                              <Bed className="h-3 w-3 mr-1" />
                              <span>{property.bedrooms}</span>
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center">
                              <Bath className="h-3 w-3 mr-1" />
                              <span>{property.bathrooms}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="mr-4">
              Voir tous les biens à vendre
            </Button>
            <Button size="lg" variant="outline">
              Voir tous les biens à louer
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Outils et Ressources
            </h2>
            <p className="text-xl text-gray-600">
              Des outils gratuits pour vous aider dans vos décisions immobilières
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <Calculator className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-semibold">Simulateur de Prêt</h3>
                <p className="text-gray-600">Calculez votre capacité d'emprunt et vos mensualités</p>
                <Button variant="outline">Utiliser l'outil</Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <MapPin className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-semibold">Carte Interactive</h3>
                <p className="text-gray-600">Explorez les quartiers et leurs prix moyens</p>
                <Button variant="outline">Voir la carte</Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <TrendingUp className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-semibold">Tendances Marché</h3>
                <p className="text-gray-600">Suivez l'évolution des prix par région</p>
                <Button variant="outline">Consulter</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Besoin d'un conseil personnalisé ?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Nos experts sont à votre disposition pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Prendre rendez-vous
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}