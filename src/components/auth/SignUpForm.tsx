import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../stores/authStore'
import { toast } from 'react-hot-toast'

interface SignUpForm {
  full_name: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
  role: 'client' | 'agent'
  acceptTerms: boolean
}

export const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'client',
      acceptTerms: false,
    },
  })

  const password = watch('password')

  const onSubmit = async (data: SignUpForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (!data.acceptTerms) {
      toast.error('Vous devez accepter les conditions d\'utilisation')
      return
    }

    try {
      await signUp({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      })
      toast.success('Compte créé avec succès !')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Erreur lors de la création du compte')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="Nom complet"
          {...register('full_name', { 
            required: 'Le nom complet est requis',
            minLength: {
              value: 2,
              message: 'Le nom doit contenir au moins 2 caractères'
            }
          })}
          error={errors.full_name?.message}
          placeholder="Votre nom complet"
          icon={User}
        />
      </div>

      <div>
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
          icon={Mail}
        />
      </div>

      <div>
        <Input
          label="Téléphone (optionnel)"
          {...register('phone')}
          placeholder="+221 77 123 45 67"
          icon={Phone}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type de compte
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              value="client"
              {...register('role', { required: 'Veuillez sélectionner un type de compte' })}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">Client</div>
              <div className="text-xs text-gray-500">Acheter ou louer</div>
            </div>
          </label>
          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              value="agent"
              {...register('role', { required: 'Veuillez sélectionner un type de compte' })}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">Agent</div>
              <div className="text-xs text-gray-500">Vendre ou gérer</div>
            </div>
          </label>
          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 col-span-2">
            <input
              type="radio"
              value="admin"
              {...register('role', { required: 'Veuillez sélectionner un type de compte' })}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">Administrateur</div>
              <div className="text-xs text-gray-500">Gestion complète de la plateforme</div>
            </div>
          </label>
        </div>
        {errors.role && (
          <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { 
              required: 'Le mot de passe est requis',
              minLength: {
                value: 6,
                message: 'Le mot de passe doit contenir au moins 6 caractères'
              }
            })}
            error={errors.password?.message}
            placeholder="Votre mot de passe"
            icon={Lock}
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <div className="relative">
          <Input
            label="Confirmer le mot de passe"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', { 
              required: 'Veuillez confirmer votre mot de passe',
              validate: (value) => value === password || 'Les mots de passe ne correspondent pas'
            })}
            error={errors.confirmPassword?.message}
            placeholder="Confirmez votre mot de passe"
            icon={Lock}
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="accept-terms"
          type="checkbox"
          {...register('acceptTerms', { required: 'Vous devez accepter les conditions d\'utilisation' })}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
          J'accepte les{' '}
          <Link to="/cgu" className="text-emerald-600 hover:text-emerald-500">
            conditions d'utilisation
          </Link>{' '}
          et la{' '}
          <Link to="/politique-confidentialite" className="text-emerald-600 hover:text-emerald-500">
            politique de confidentialité
          </Link>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Création...' : 'Créer mon compte'}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/auth/signin" className="font-medium text-emerald-600 hover:text-emerald-500">
            Se connecter
          </Link>
        </span>
      </div>
    </form>
  )
}