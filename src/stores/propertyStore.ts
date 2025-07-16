import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Property } from '../lib/supabase'

interface PropertyFilters {
  type?: string
  region?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  search?: string
}

interface PropertyState {
  properties: Property[]
  filters: PropertyFilters
  loading: boolean
  fetchProperties: () => Promise<void>
  addProperty: (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>
  deleteProperty: (id: string) => Promise<void>
  setFilters: (filters: PropertyFilters) => void
  getFilteredProperties: () => Property[]
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  filters: {},
  loading: false,

  fetchProperties: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles:agent_id (
            full_name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      set({ properties: data || [] })
    } catch (error: any) {
      console.error('Error fetching properties:', error)
    } finally {
      set({ loading: false })
    }
  },

  addProperty: async (propertyData) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single()

      if (error) throw error

      set(state => ({
        properties: [data, ...state.properties]
      }))
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de l\'ajout du bien')
    }
  },

  updateProperty: async (id, propertyData) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      set(state => ({
        properties: state.properties.map(property =>
          property.id === id ? data : property
        )
      }))
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la modification du bien')
    }
  },

  deleteProperty: async (id) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) throw error

      set(state => ({
        properties: state.properties.filter(property => property.id !== id)
      }))
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la suppression du bien')
    }
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