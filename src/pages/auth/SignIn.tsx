import React from 'react'
import { Building2 } from 'lucide-react'
import { SignInForm } from '../../components/auth/SignInForm'

export const SignIn: React.FC = () => {
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
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Sign in form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-200">
          <SignInForm />
          
          {/* Guide d'utilisation */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Guide d'utilisation
              </h3>
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Admin
                  </span>
                  <span>Gestion complète</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Agent
                  </span>
                  <span>Gestion des biens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Client
                  </span>
                  <span>Recherche et favoris</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}