import React from 'react'
import { X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { useForm } from 'react-hook-form'
import { usePropertyStore } from '../../stores/propertyStore'
import { MockProperty } from '../../data/mockData'
import { toast } from 'react-hot-toast'

interface PropertyFormProps {
  property?: MockProperty | null
  onClose: () => void
  onSuccess: () => void
}

interface PropertyFormData {
  title: string
  description: string
  type: 'appartement' | 'maison' | 'terrain' | 'bureau' | 'commerce'
  price: number
  surface?: number
  bedrooms: number
  bathrooms: number
  location: string
  district: string
  region: string
  status: 'disponible' | 'loué' | 'vendu' | 'en_négociation'
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  property,
  onClose,
  onSuccess
}) => {
  const { addProperty, updateProperty } = usePropertyStore()
  const isEditing = !!property

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PropertyFormData>({
    defaultValues: property ? {
      title: property.title,
      description: property.description,
      type: property.type,
      price: property.price,
      surface: property.surface,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      location: property.location,
      district: property.district,
      region: property.region,
      status: property.status,
    } : {
      title: '',
      description: '',
      type: 'appartement',
      price: 0,
      surface: 0,
      bedrooms: 0,
      bathrooms: 0,
      location: '',
      district: '',
      region: 'Dakar',
      status: 'disponible',
    },
  })

  const onSubmit = async (data: PropertyFormData) => {
    try {
      if (isEditing && property) {
        await updateProperty(property.id, data)
        toast.success('Bien modifié avec succès')
      } else {
        await addProperty(data)
        toast.success('Bien ajouté avec succès')
      }
      onSuccess()
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Modifier le bien' : 'Ajouter un bien'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Titre"
              {...register('title', { required: 'Le titre est requis' })}
              error={errors.title?.message}
              placeholder="Ex: Villa moderne avec piscine"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description', { required: 'La description est requise' })}
                rows={4}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Décrivez le bien en détail..."
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de bien
                </label>
                <select
                  {...register('type', { required: 'Le type est requis' })}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="terrain">Terrain</option>
                  <option value="bureau">Bureau</option>
                  <option value="commerce">Commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  {...register('status')}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="disponible">Disponible</option>
                  <option value="loué">Loué</option>
                  <option value="vendu">Vendu</option>
                  <option value="en_négociation">En négociation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Prix (CFA)"
                type="number"
                {...register('price', { 
                  required: 'Le prix est requis',
                  min: { value: 1, message: 'Le prix doit être positif' }
                })}
                error={errors.price?.message}
                placeholder="50000000"
              />

              <Input
                label="Surface (m²)"
                type="number"
                {...register('surface')}
                placeholder="120"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Région
                </label>
                <select
                  {...register('region')}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Dakar">Dakar</option>
                  <option value="Thiès">Thiès</option>
                  <option value="Saint-Louis">Saint-Louis</option>
                  <option value="Kaolack">Kaolack</option>
                  <option value="Ziguinchor">Ziguinchor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Localisation"
                {...register('location', { required: 'La localisation est requise' })}
                error={errors.location?.message}
                placeholder="Ex: Almadies"
              />

              <Input
                label="Quartier/District"
                {...register('district', { required: 'Le district est requis' })}
                error={errors.district?.message}
                placeholder="Ex: Almadies"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre de chambres"
                type="number"
                {...register('bedrooms', { min: 0 })}
                placeholder="3"
              />

              <Input
                label="Nombre de salles de bain"
                type="number"
                {...register('bathrooms', { min: 0 })}
                placeholder="2"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sauvegarde...' : (isEditing ? 'Modifier' : 'Ajouter')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}