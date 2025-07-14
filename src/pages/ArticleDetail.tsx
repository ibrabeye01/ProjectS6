import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Article fictif basé sur l'ID
  const article = {
    id: id || '1',
    title: 'Le marché immobilier sénégalais en forte croissance en 2024',
    content: `
      <p>Le marché immobilier sénégalais affiche une santé remarquable en 2024, avec une croissance exceptionnelle qui témoigne de la dynamique économique du pays. Cette progression s'explique par plusieurs facteurs convergents qui renforcent l'attractivité du secteur.</p>

      <h2>Une demande en forte hausse</h2>
      <p>La demande immobilière au Sénégal connaît une augmentation significative, portée par une classe moyenne en expansion et des politiques gouvernementales favorables. Les zones urbaines, particulièrement Dakar et sa banlieue, enregistrent une demande soutenue pour tous types de biens.</p>

      <h2>Les secteurs porteurs</h2>
      <p>Plusieurs segments du marché se distinguent particulièrement :</p>
      <ul>
        <li><strong>Le résidentiel haut de gamme</strong> : Les quartiers d'Almadies, Ngor et Ouakam attirent une clientèle aisée</li>
        <li><strong>Le logement social</strong> : Programmes gouvernementaux ambitieux pour répondre aux besoins des classes moyennes</li>
        <li><strong>L'immobilier commercial</strong> : Bureaux et espaces commerciaux en forte demande</li>
        <li><strong>Le tourisme immobilier</strong> : Saly et la Petite Côte continuent d'attirer les investisseurs</li>
      </ul>

      <h2>Les facteurs de croissance</h2>
      <p>Cette croissance s'appuie sur des fondamentaux solides :</p>
      <ul>
        <li>Stabilité politique et économique du pays</li>
        <li>Amélioration des infrastructures de transport</li>
        <li>Développement du secteur bancaire et de l'accès au crédit</li>
        <li>Attractivité pour les investisseurs étrangers</li>
      </ul>

      <h2>Perspectives d'avenir</h2>
      <p>Les experts s'accordent sur la poursuite de cette tendance positive. Les grands projets d'infrastructure, comme le TER (Train Express Régional) et les nouveaux pôles urbains, devraient continuer à stimuler le marché.</p>

      <p>Cette dynamique offre des opportunités exceptionnelles tant pour les primo-accédants que pour les investisseurs souhaitant diversifier leur portefeuille dans un marché en pleine expansion.</p>
    `,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '15 Mars 2024',
    author: 'Amadou Diallo',
    category: 'Marché',
    readTime: '5 min'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/actualites')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux actualités
          </Button>
        </div>

        {/* Article */}
        <Card className="overflow-hidden">
          {/* Image principale */}
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <div className="p-8">
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                {article.category}
              </span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {article.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime} de lecture
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Actions */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>

            {/* Contenu */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
            />

            {/* Footer de l'article */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-lg">{article.author}</div>
                  <div className="text-gray-600">Expert en immobilier sénégalais</div>
                  <div className="text-sm text-gray-500 mt-1">
                    15 ans d'expérience dans le secteur immobilier
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Articles similaires */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Nouvelle réglementation pour les investissements immobiliers',
                image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400',
                date: '12 Mars 2024'
              },
              {
                title: 'Saly : La destination immobilière de choix pour 2024',
                image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400',
                date: '10 Mars 2024'
              }
            ].map((relatedArticle, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {relatedArticle.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}