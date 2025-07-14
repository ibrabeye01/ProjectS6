import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../stores/authStore'
import { toast } from 'react-hot-toast'

interface SignInForm {
  email: string
  password: string
}

export const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuthStore()
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInForm) => {
    try {
      await signIn(data.email, data.password)
      toast.success('Connexion réussie !')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Email ou mot de passe incorrect')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Se souvenir de moi
          </label>
        </div>

        <div className="text-sm">
          <Link to="/auth/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-500">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/auth/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
            Créer un compte
          </Link>
        </span>
      </div>
    </form>
  )
}