import React from 'react'
import { Plus, Edit, Trash2, Users, UserCheck, UserX } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { useUserStore } from '../stores/userStore'
import { useAuthStore } from '../stores/authStore'
import { UserForm } from '../components/users/UserForm'
import { MockUser } from '../data/mockData'
import { toast } from 'react-hot-toast'

export const UserManagement: React.FC = () => {
  const { users, fetchUsers, deleteUser } = useUserStore()
  const { profile } = useAuthStore()
  const [showForm, setShowForm] = React.useState(false)
  const [editingUser, setEditingUser] = React.useState<MockUser | null>(null)

  React.useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleEdit = (user: MockUser) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDelete = async (user: MockUser) => {
    if (user.id === profile?.id) {
      toast.error('Vous ne pouvez pas supprimer votre propre compte')
      return
    }

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.full_name}" ?`)) {
      try {
        await deleteUser(user.id)
        toast.success('Utilisateur supprimé avec succès')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    agent: 'bg-blue-100 text-blue-800',
    client: 'bg-green-100 text-green-800'
  }

  const roleLabels = {
    admin: 'Administrateur',
    agent: 'Agent',
    client: 'Client'
  }

  const roleIcons = {
    admin: UserX,
    agent: UserCheck,
    client: Users
  }

  const adminUsers = users.filter(u => u.role === 'admin')
  const agentUsers = users.filter(u => u.role === 'agent')
  const clientUsers = users.filter(u => u.role === 'client')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-2">
            Gérez les administrateurs, agents et clients
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Administrateurs</p>
                <p className="text-2xl font-bold text-red-600">{adminUsers.length}</p>
              </div>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agents</p>
                <p className="text-2xl font-bold text-blue-600">{agentUsers.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clients</p>
                <p className="text-2xl font-bold text-green-600">{clientUsers.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Liste des Utilisateurs</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rôle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Téléphone</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const RoleIcon = roleIcons[user.role]
                  return (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <RoleIcon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.full_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                          {roleLabels[user.role]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.phone || '-'}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.id !== profile?.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(user)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Form Modal */}
      {showForm && (
        <UserForm
          user={editingUser}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose()
            fetchUsers()
          }}
        />
      )}
    </div>
  )
}