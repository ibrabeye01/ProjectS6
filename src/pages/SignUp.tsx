import React from 'react'
import { Building2 } from 'lucide-react'
import { SignUpForm } from '../../components/auth/SignUpForm'

export const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and title */}
        <div className="text-center">
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            ImmoSénégal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Créez votre compte professionnel
          </p>
        </div>

        {/* Sign up form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-200">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}