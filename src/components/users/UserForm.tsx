import React from 'react'
import { X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../../stores/userStore'
import { MockUser } from '../../data/mockData'
import { toast } from 'react-hot-toast'

interface UserFormProps {
  user?: MockUser | null
  onClose: () => void
  onSuccess: () => void
}

interface UserFormData {
  full_name: string
  email: string
  phone?: string
  role: 'admin' | 'agent' | 'client'
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onClose,
  onSuccess
}) => {
  const { addUser, updateUser } = useUserStore()
  const isEditing = !!user

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormData>({
    defaultValues: user ? {
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    } : {
      full_name: '',
      email: '',
      phone: '',
      role: 'client',
    },
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEditing && user) {
        await updateUser(user.id, data)
        toast.success('Utilisateur modifié avec succès')
      } else {
        await addUser(data)
        toast.success('Utilisateur ajouté avec succès')
      }
      onSuccess()
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nom complet"
              {...register('full_name', { required: 'Le nom est requis' })}
              error={errors.full_name?.message}
              placeholder="Nom complet"
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
              placeholder="email@exemple.com"
            />

            <Input
              label="Téléphone"
              {...register('phone')}
              placeholder="+221 77 123 45 67"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                {...register('role', { required: 'Le rôle est requis' })}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="client">Client</option>
                <option value="agent">Agent</option>
                <option value="admin">Administrateur</option>
              </select>
              {errors.role && (
                <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
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