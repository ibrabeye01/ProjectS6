import React from 'react'
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export const News: React.FC = () => {
  const featuredNews = {
    id: 1,
    title: 'Le marché immobilier sénégalais en forte croissance en 2024',
    excerpt: 'Selon les dernières études, le secteur immobilier au Sénégal connaît une croissance exceptionnelle avec une hausse de 15% des transactions.',
    content: 'Le marché immobilier sénégalais affiche une santé remarquable en 2024...',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '15 Mars 2024',
    author: 'Amadou Diallo',
    category: 'Marché',
    readTime: '5 min'
  }

  const news = [
    {
      id: 2,
      title: 'Nouvelle réglementation pour les investissements immobiliers étrangers',
      excerpt: 'Le gouvernement sénégalais annonce de nouvelles mesures pour faciliter les investissements immobiliers étrangers.',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '12 Mars 2024',
      author: 'Fatou Sall',
      category: 'Réglementation',
      readTime: '3 min'
    },
    {
      id: 3,
      title: 'Saly : La destination immobilière de choix pour 2024',
      excerpt: 'La station balnéaire de Saly attire de plus en plus d\'investisseurs grâce à son potentiel touristique.',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '10 Mars 2024',
      author: 'Moussa Ba',
      category: 'Investissement',
      readTime: '4 min'
    },
    {
      id: 4,
      title: 'Technologies digitales : Révolution du secteur immobilier',
      excerpt: 'Les nouvelles technologies transforment la façon dont nous achetons et vendons des biens immobiliers.',
      image: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '8 Mars 2024',
      author: 'Aïcha Ndiaye',
      category: 'Innovation',
      readTime: '6 min'
    },
    {
      id: 5,
      title: 'Prix de l\'immobilier à Dakar : Analyse du premier trimestre',
      excerpt: 'Une analyse détaillée de l\'évolution des prix immobiliers dans la capitale sénégalaise.',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '5 Mars 2024',
      author: 'Ibrahima Sarr',
      category: 'Analyse',
      readTime: '7 min'
    },
    {
      id: 6,
      title: 'Écoquartiers : L\'avenir de l\'habitat au Sénégal',
      excerpt: 'Les projets d\'écoquartiers se multiplient, offrant une alternative durable pour l\'habitat urbain.',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2 Mars 2024',
      author: 'Mariama Diop',
      category: 'Développement durable',
      readTime: '5 min'
    },
    {
      id: 7,
      title: 'Financement immobilier : Nouvelles offres bancaires',
      excerpt: 'Les banques sénégalaises lancent de nouveaux produits pour faciliter l\'accès à la propriété.',
      image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '28 Février 2024',
      author: 'Ousmane Fall',
      category: 'Financement',
      readTime: '4 min'
    }
  ]

  const categories = ['Tous', 'Marché', 'Investissement', 'Réglementation', 'Innovation', 'Analyse', 'Financement']
  const [selectedCategory, setSelectedCategory] = React.useState('Tous')

  const filteredNews = selectedCategory === 'Tous' 
    ? news 
    : news.filter(article => article.category === selectedCategory)

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Actualités Immobilières
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Restez informé des dernières tendances et actualités du marché immobilier sénégalais
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              <TrendingUp className="h-4 w-4 mr-1" />
              À la une
            </span>
          </div>
          
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                    {featuredNews.category}
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {featuredNews.author}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredNews.excerpt}
                </p>
                <Button>
                  Lire l'article complet
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span>{article.readTime} de lecture</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                    <Button variant="ghost" size="sm">
                      Lire plus
                      <ArrowRight 
                        className="h-3 w-3 ml-1" 
                        onClick={() => window.location.href = `/actualites/${article.id}`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Restez informé de l'actualité immobilière
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Recevez chaque semaine notre newsletter avec les dernières actualités, 
            analyses et conseils du marché immobilier sénégalais.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Button 
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => window.location.href = '/newsletter'}
            >
              S'abonner
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}