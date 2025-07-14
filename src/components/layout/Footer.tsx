import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">ImmoSénégal</span>
            </div>
            <p className="text-gray-300 text-sm">
              La plateforme de référence pour l'immobilier au Sénégal. 
              Trouvez, achetez, vendez ou louez en toute confiance.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-emerald-400">Accueil</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-emerald-400">Services</Link></li>
              <li><Link to="/a-propos" className="text-gray-300 hover:text-emerald-400">À propos</Link></li>
              <li><Link to="/actualites" className="text-gray-300 hover:text-emerald-400">Actualités</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-emerald-400">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Vente immobilière</span></li>
              <li><span className="text-gray-300">Location</span></li>
              <li><span className="text-gray-300">Gestion locative</span></li>
              <li><span className="text-gray-300">Conseil investissement</span></li>
              <li><span className="text-gray-300">Évaluation</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">Plateau, Dakar, Sénégal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">+221 77 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">contact@immosenegal.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ImmoSénégal. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/mentions-legales" className="text-gray-400 hover:text-emerald-400 text-sm">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-gray-400 hover:text-emerald-400 text-sm">
              Politique de confidentialité
            </Link>
            <Link to="/cgu" className="text-gray-400 hover:text-emerald-400 text-sm">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}