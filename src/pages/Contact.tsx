import React from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = (data: ContactForm) => {
    console.log('Message envoyé:', data)
    toast.success('Votre message a été envoyé avec succès !')
    reset()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos projets immobiliers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Nos Coordonnées</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Adresse</h3>
                    <p className="text-gray-600">
                      Rue 10 x Avenue Bourguiba<br />
                      Plateau, Dakar<br />
                      Sénégal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-gray-600">
                      +221 77 123 45 67<br />
                      +221 33 821 00 00
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">
                      contact@immosenegal.com<br />
                      info@immosenegal.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi : 8h - 18h<br />
                      Samedi : 9h - 16h<br />
                      Dimanche : Fermé
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carte */}
            <Card>
              <CardContent className="p-0">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Carte interactive à venir</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Envoyez-nous un message</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nom complet"
                      {...register('name', { required: 'Le nom est requis' })}
                      error={errors.name?.message}
                      placeholder="Votre nom"
                    />
                    <Input
                      label="Email"
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Téléphone"
                      {...register('phone')}
                      placeholder="+221 77 123 45 67"
                    />
                    <Input
                      label="Sujet"
                      {...register('subject', { required: 'Le sujet est requis' })}
                      error={errors.subject?.message}
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      {...register('message', { required: 'Le message est requis' })}
                      rows={6}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Décrivez votre projet ou posez votre question..."
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-5 w-5 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Comment puis-je vendre mon bien rapidement ?",
                answer: "Nous vous accompagnons avec une évaluation gratuite, un marketing digital ciblé et notre réseau d'acheteurs qualifiés."
              },
              {
                question: "Quels sont vos frais d'agence ?",
                answer: "Nos frais sont transparents et compétitifs. Contactez-nous pour un devis personnalisé selon votre projet."
              },
              {
                question: "Proposez-vous un service de gestion locative ?",
                answer: "Oui, nous gérons votre bien de A à Z : recherche de locataires, encaissement des loyers, maintenance."
              },
              {
                question: "Dans quelles régions intervenez-vous ?",
                answer: "Nous couvrons tout le Sénégal avec une expertise particulière sur Dakar, Thiès, Saint-Louis et Saly."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}