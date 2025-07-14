import { create } from 'zustand'
import { mockProperties, MockProperty } from '../data/mockData'

interface PropertyFilters {
  type?: string
  region?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  search?: string
}

interface PropertyState {
  properties: MockProperty[]
  filters: PropertyFilters
  loading: boolean
  fetchProperties: () => Promise<void>
  addProperty: (property: Omit<MockProperty, 'id'>) => Promise<void>
  updateProperty: (id: string, property: Partial<MockProperty>) => Promise<void>
  deleteProperty: (id: string) => Promise<void>
  setFilters: (filters: PropertyFilters) => void
  getFilteredProperties: () => MockProperty[]
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  filters: {},
  loading: false,

  fetchProperties: async () => {
    set({ loading: true })
    // Simulation d'un appel API
    setTimeout(() => {
      set({ properties: mockProperties, loading: false })
    }, 500)
  },

  addProperty: async (propertyData) => {
    const newProperty: MockProperty = {
      ...propertyData,
      id: `property_${Date.now()}`,
    }
    
    set(state => ({
      properties: [...state.properties, newProperty]
    }))
  },

  updateProperty: async (id, propertyData) => {
    set(state => ({
      properties: state.properties.map(property =>
        property.id === id ? { ...property, ...propertyData } : property
      )
    }))
  },

  deleteProperty: async (id) => {
    set(state => ({
      properties: state.properties.filter(property => property.id !== id)
    }))
  },

  setFilters: (filters) => {
    set({ filters })
  },

  getFilteredProperties: () => {
    const { properties, filters } = get()
    
    return properties.filter(property => {
      if (filters.type && property.type !== filters.type) return false
      if (filters.region && property.region !== filters.region) return false
      if (filters.status && property.status !== filters.status) return false
      if (filters.minPrice && property.price < filters.minPrice) return false
      if (filters.maxPrice && property.price > filters.maxPrice) return false
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  },
}))