import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockUsers, MockUser } from '../data/mockData'

interface AuthState {
  isAuthenticated: boolean
  profile: MockUser | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: Omit<MockUser, 'id'>) => Promise<void>
  signOut: () => void
  updateProfile: (data: Partial<MockUser>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      profile: null,

      signIn: async (email: string, password: string) => {
        // Simulation d'une authentification
        const user = mockUsers.find(u => u.email === email)
        
        if (!user || password !== 'password123') {
          throw new Error('Invalid credentials')
        }

        set({
          isAuthenticated: true,
          profile: user,
        })
      },

      signUp: async (userData) => {
        // Simulation d'une inscription
        const newUser: MockUser = {
          ...userData,
          id: `user_${Date.now()}`,
        }

        // Ajouter l'utilisateur à la liste (simulation)
        mockUsers.push(newUser)

        set({
          isAuthenticated: true,
          profile: newUser,
        })
      },

      signOut: () => {
        set({
          isAuthenticated: false,
          profile: null,
        })
      },

      updateProfile: (data) => {
        const { profile } = get()
        if (profile) {
          const updatedProfile = { ...profile, ...data }
          set({ profile: updatedProfile })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)