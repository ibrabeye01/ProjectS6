import React from 'react'
import { Plus } from 'lucide-react'
import { PropertyCard } from '../components/properties/PropertyCard'
import { PropertyFilters } from '../components/properties/PropertyFilters'
import { PropertyForm } from '../components/properties/PropertyForm'
import { Button } from '../components/ui/Button'
import { usePropertyStore } from '../stores/propertyStore'
import { useAuthStore } from '../stores/authStore'
import { MockProperty } from '../data/mockData'
import { toast } from 'react-hot-toast'

export const Properties: React.FC = () => {
  const { getFilteredProperties, fetchProperties, deleteProperty } = usePropertyStore()
  const { profile } = useAuthStore()
  const properties = getFilteredProperties()
  const [showForm, setShowForm] = React.useState(false)
  const [editingProperty, setEditingProperty] = React.useState<MockProperty | null>(null)

  React.useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const canAddProperty = profile?.role === 'admin' || profile?.role === 'agent'

  const handleView = (property: MockProperty) => {
    window.location.href = `/biens/${property.id}`
  }

  const handleEdit = (property: MockProperty) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleDelete = async (property: MockProperty) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${property.title}" ?`)) {
      try {
        await deleteProperty(property.id)
        toast.success('Bien supprimé avec succès')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleAddProperty = () => {
    setEditingProperty(null)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  const handleFormSuccess = () => {
    handleFormClose()
    fetchProperties()
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biens immobiliers</h1>
          <p className="text-gray-600 mt-2">
            Gérez votre portefeuille immobilier
          </p>
        </div>
        {canAddProperty && (
          <Button onClick={handleAddProperty}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un bien
          </Button>
        )}
      </div>

      {/* Filters */}
      <PropertyFilters />

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty state */}
      {properties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun bien trouvé
          </h3>
          <p className="text-gray-500 mb-4">
            Commencez par ajouter votre premier bien immobilier ou modifiez vos filtres.
          </p>
          {canAddProperty && (
            <Button onClick={handleAddProperty}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un bien
            </Button>
          )}
        </div>
      )}

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}