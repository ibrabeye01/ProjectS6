import { create } from 'zustand'
import { mockUsers, MockUser } from '../data/mockData'

interface UserState {
  users: MockUser[]
  loading: boolean
  fetchUsers: () => Promise<void>
  addUser: (user: Omit<MockUser, 'id'>) => Promise<void>
  updateUser: (id: string, user: Partial<MockUser>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true })
    // Simulation d'un appel API
    setTimeout(() => {
      set({ users: mockUsers, loading: false })
    }, 300)
  },

  addUser: async (userData) => {
    const newUser: MockUser = {
      ...userData,
      id: `user_${Date.now()}`,
    }
    
    set(state => ({
      users: [...state.users, newUser]
    }))
  },

  updateUser: async (id, userData) => {
    set(state => ({
      users: state.users.map(user =>
        user.id === id ? { ...user, ...userData } : user
      )
    }))
  },

  deleteUser: async (id) => {
    set(state => ({
      users: state.users.filter(user => user.id !== id)
    }))
  },
}))