import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/supabase'

interface UserState {
  users: Profile[]
  loading: boolean
  fetchUsers: () => Promise<void>
  addUser: (user: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateUser: (id: string, user: Partial<Profile>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      set({ users: data || [] })
    } catch (error: any) {
      console.error('Error fetching users:', error)
    } finally {
      set({ loading: false })
    }
  },

  addUser: async (userData) => {
    try {
      // For adding users, we would typically use Supabase Auth
      // This is a simplified version for demo purposes
      const { data, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: 'temporary123', // In real app, generate secure password
        email_confirm: true,
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            ...userData,
          })

        if (profileError) throw profileError

        await get().fetchUsers()
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de l\'ajout de l\'utilisateur')
    }
  },

  updateUser: async (id, userData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', id)

      if (error) throw error

      set(state => ({
        users: state.users.map(user =>
          user.id === id ? { ...user, ...userData } : user
        )
      }))
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la modification de l\'utilisateur')
    }
  },

  deleteUser: async (id) => {
    try {
      // Delete from auth (admin only)
      const { error: authError } = await supabase.auth.admin.deleteUser(id)
      if (authError) throw authError

      // Profile will be deleted automatically due to CASCADE
      set(state => ({
        users: state.users.filter(user => user.id !== id)
      }))
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la suppression de l\'utilisateur')
    }
  },
}))