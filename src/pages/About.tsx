import React from 'react'
import { Users, Target, Award, MapPin, Phone, Mail, Building2 } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'

export const About: React.FC = () => {
  const team = [
    {
      name: 'Amadou Diallo',
      role: 'Directeur Général',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: '15 ans d\'expérience dans l\'immobilier sénégalais'
    },
    {
      name: 'Fatou Sall',
      role: 'Directrice Commerciale',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Experte en négociation et relation client'
    },
    {
      name: 'Moussa Ba',
      role: 'Responsable Investissements',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Spécialiste en analyse financière immobilière'
    },
    {
      name: 'Aïcha Ndiaye',
      role: 'Directrice Marketing',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Innovation digitale et stratégie marketing'
    }
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque transaction et chaque interaction avec nos clients.'
    },
    {
      icon: Users,
      title: 'Confiance',
      description: 'La confiance est au cœur de nos relations. Nous privilégions la transparence et l\'honnêteté.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Nous adoptons les dernières technologies pour offrir une expérience immobilière moderne.'
    },
    {
      icon: Building2,
      title: 'Expertise Locale',
      description: 'Notre connaissance approfondie du marché sénégalais est notre force principale.'
    }
  ]

  const stats = [
    { number: '2018', label: 'Année de création' },
    { number: '500+', label: 'Biens vendus' },
    { number: '1000+', label: 'Clients satisfaits' },
    { number: '50+', label: 'Agents partenaires' }
  ]

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            À Propos d'ImmoSénégal
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Depuis 2018, nous révolutionnons le marché immobilier sénégalais en combinant 
            expertise locale et innovation technologique pour offrir un service d'exception.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Chez ImmoSénégal, notre mission est de démocratiser l'accès à l'immobilier 
                au Sénégal en offrant une plateforme moderne, transparente et accessible à tous. 
                Nous croyons que chaque Sénégalais mérite d'avoir accès à un logement de qualité.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Nous nous engageons à accompagner nos clients dans leurs projets immobiliers, 
                qu'il s'agisse d'un premier achat, d'un investissement locatif ou d'une vente, 
                avec professionnalisme et bienveillance.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Bureau ImmoSénégal"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">6 ans</div>
                <div className="text-emerald-100">d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre action quotidienne et notre relation avec nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe passionnée et expérimentée, dédiée à votre réussite immobilière
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Histoire
            </h2>
            <p className="text-xl text-gray-600">
              Un parcours jalonné d'innovations et de succès
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                year: '2018',
                title: 'Création d\'ImmoSénégal',
                description: 'Lancement de la première plateforme immobilière digitale du Sénégal avec une équipe de 5 personnes passionnées.'
              },
              {
                year: '2019',
                title: 'Expansion régionale',
                description: 'Extension de nos services à Thiès, Saint-Louis et Saly. Première centaine de biens référencés.'
              },
              {
                year: '2021',
                title: 'Innovation technologique',
                description: 'Lancement de notre application mobile et intégration de la visite virtuelle 360°.'
              },
              {
                year: '2023',
                title: 'Leadership du marché',
                description: 'Plus de 500 biens vendus et 1000 clients satisfaits. Reconnaissance comme leader du digital immobilier.'
              },
              {
                year: '2024',
                title: 'Nouveaux horizons',
                description: 'Lancement de services d\'investissement et partenariats avec les principales banques sénégalaises.'
              }
            ].map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contactez-Nous
            </h2>
            <p className="text-xl text-emerald-100">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <MapPin className="h-12 w-12 text-emerald-300 mx-auto" />
              <h3 className="text-xl font-semibold">Adresse</h3>
              <p className="text-emerald-100">
                Rue 10 x Avenue Bourguiba<br />
                Plateau, Dakar<br />
                Sénégal
              </p>
            </div>

            <div className="space-y-4">
              <Phone className="h-12 w-12 text-emerald-300 mx-auto" />
              <h3 className="text-xl font-semibold">Téléphone</h3>
              <p className="text-emerald-100">
                +221 77 123 45 67<br />
                +221 33 821 00 00
              </p>
            </div>

            <div className="space-y-4">
              <Mail className="h-12 w-12 text-emerald-300 mx-auto" />
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-emerald-100">
                contact@immosenegal.com<br />
                info@immosenegal.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}