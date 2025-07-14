import React from 'react'
import { Mail, CheckCircle, TrendingUp, Users, Bell } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

interface NewsletterForm {
  email: string
  name: string
  interests?: string[]
}

export const Newsletter: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterForm>({
    defaultValues: {
      email: '',
      name: '',
      interests: [],
    },
  })
  const [isSubscribed, setIsSubscribed] = React.useState(false)

  const onSubmit = (data: NewsletterForm) => {
    console.log('Inscription newsletter:', data)
    setIsSubscribed(true)
    toast.success('Inscription réussie ! Vous recevrez notre prochaine newsletter.')
    reset()
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Inscription confirmée !
            </h1>
            <p className="text-gray-600 mb-6">
              Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt 
              nos dernières actualités immobilières directement dans votre boîte mail.
            </p>
            <Button onClick={() => setIsSubscribed(false)}>
              S'inscrire à nouveau
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Mail className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Newsletter ImmoSénégal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restez informé des dernières tendances du marché immobilier sénégalais. 
            Recevez chaque semaine nos analyses, conseils et opportunités exclusives.
          </p>
        </div>

        {/* Avantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Analyses de Marché</h3>
              <p className="text-gray-600 text-sm">
                Tendances, prix et prévisions du marché immobilier sénégalais
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Conseils d'Experts</h3>
              <p className="text-gray-600 text-sm">
                Recommandations personnalisées de nos professionnels
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Bell className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Opportunités Exclusives</h3>
              <p className="text-gray-600 text-sm">
                Accès prioritaire aux meilleures offres immobilières
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formulaire d'inscription */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">Inscrivez-vous gratuitement</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Nom complet"
                {...register('name', { required: 'Le nom est requis' })}
                error={errors.name?.message}
                placeholder="Votre nom"
              />

              <Input
                label="Adresse email"
                type="email"
                {...register('email', { 
                  required: 'L\'email est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Format email invalide'
                  }
                })}
                error={errors.email?.message}
                placeholder="votre@email.com"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Centres d'intérêt (optionnel)
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'achat', label: 'Achat immobilier' },
                    { value: 'vente', label: 'Vente de bien' },
                    { value: 'location', label: 'Location' },
                    { value: 'investissement', label: 'Investissement' },
                    { value: 'commercial', label: 'Immobilier commercial' }
                  ].map((interest) => (
                    <label key={interest.value} className="flex items-center">
                      <input
                        type="checkbox"
                        value={interest.value}
                        {...register('interests')}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{interest.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600">
                  En vous inscrivant, vous acceptez de recevoir nos newsletters. 
                  Vous pouvez vous désabonner à tout moment. Vos données sont protégées 
                  et ne seront jamais partagées avec des tiers.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Mail className="h-5 w-5 mr-2" />
                S'inscrire à la newsletter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Aperçu newsletter */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Aperçu de notre dernière newsletter
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="border-l-4 border-emerald-500 pl-4 mb-4">
                <h3 className="font-semibold text-lg">Newsletter #47 - Mars 2024</h3>
                <p className="text-gray-600">Marché immobilier : Les tendances du premier trimestre</p>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>📈 <strong>Analyse :</strong> +15% de transactions par rapport à 2023</p>
                <p>🏠 <strong>Focus région :</strong> Saly, la nouvelle destination prisée</p>
                <p>💡 <strong>Conseil :</strong> Comment négocier efficacement en 2024</p>
                <p>🎯 <strong>Opportunité :</strong> 5 biens exclusifs à découvrir</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}