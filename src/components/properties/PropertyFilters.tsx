import React from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { usePropertyStore } from '../../stores/propertyStore'

export const PropertyFilters: React.FC = () => {
  const { filters, setFilters } = usePropertyStore()
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters({
      ...filters,
      [key]: value || undefined
    })
  }

  const clearFilters = () => {
    setFilters({})
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      {/* Recherche principale */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par titre, localisation..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            icon={Search}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres avancés
        </Button>
      </div>

      {/* Filtres avancés */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de bien
            </label>
            <select
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">Tous les types</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="terrain">Terrain</option>
              <option value="bureau">Bureau</option>
              <option value="commerce">Commerce</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Région
            </label>
            <select
              value={filters.region || ''}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">Toutes les régions</option>
              <option value="Dakar">Dakar</option>
              <option value="Thiès">Thiès</option>
              <option value="Saint-Louis">Saint-Louis</option>
              <option value="Kaolack">Kaolack</option>
              <option value="Ziguinchor">Ziguinchor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">Tous les statuts</option>
              <option value="disponible">Disponible</option>
              <option value="loué">Loué</option>
              <option value="vendu">Vendu</option>
              <option value="en_négociation">En négociation</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              Effacer les filtres
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}