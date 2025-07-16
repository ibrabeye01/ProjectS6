import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '../lib/supabase'

interface AuthState {
  user: User | null
  profile: Profile | null
  isAuthenticated: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: {
    email: string
    password: string
    full_name: string
    phone?: string
    role: 'admin' | 'agent' | 'client'
  }) => Promise<void>
  signOut: () => Promise<void>
  fetchProfile: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isAuthenticated: false,
      loading: true,

      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session?.user) {
            set({ user: session.user, isAuthenticated: true })
            await get().fetchProfile()
          }
        } catch (error) {
          console.error('Error initializing auth:', error)
        } finally {
          set({ loading: false })
        }
      },

      signIn: async (email: string, password: string) => {
        set({ loading: true })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) throw error

          if (data.user) {
            set({ user: data.user, isAuthenticated: true })
            await get().fetchProfile()
          }
        } catch (error: any) {
          throw new Error(error.message || 'Erreur de connexion')
        } finally {
          set({ loading: false })
        }
      },

      signUp: async (userData) => {
        set({ loading: true })
        try {
          const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
          })

          if (error) throw error

          if (data.user) {
            // Create profile
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                full_name: userData.full_name,
                email: userData.email,
                phone: userData.phone,
                role: userData.role,
              })

            if (profileError) throw profileError

            set({ user: data.user, isAuthenticated: true })
            await get().fetchProfile()
          }
        } catch (error: any) {
          throw new Error(error.message || 'Erreur lors de la création du compte')
        } finally {
          set({ loading: false })
        }
      },

      signOut: async () => {
        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error

          set({
            user: null,
            profile: null,
            isAuthenticated: false,
          })
        } catch (error: any) {
          throw new Error(error.message || 'Erreur lors de la déconnexion')
        }
      },

      fetchProfile: async () => {
        const { user } = get()
        if (!user) return

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error) throw error

          set({ profile: data })
        } catch (error: any) {
          console.error('Error fetching profile:', error)
        }
      },

      updateProfile: async (data) => {
        const { user } = get()
        if (!user) return

        try {
          const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id)

          if (error) throw error

          await get().fetchProfile()
        } catch (error: any) {
          throw new Error(error.message || 'Erreur lors de la mise à jour du profil')
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)