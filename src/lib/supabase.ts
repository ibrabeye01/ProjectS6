import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone?: string
          role: 'admin' | 'agent' | 'client'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone?: string
          role: 'admin' | 'agent' | 'client'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          role?: 'admin' | 'agent' | 'client'
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string
          type: 'appartement' | 'maison' | 'terrain' | 'bureau' | 'commerce'
          price: number
          surface?: number
          bedrooms: number
          bathrooms: number
          location: string
          district: string
          region: string
          status: 'disponible' | 'loué' | 'vendu' | 'en_négociation'
          images?: string[]
          agent_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: 'appartement' | 'maison' | 'terrain' | 'bureau' | 'commerce'
          price: number
          surface?: number
          bedrooms?: number
          bathrooms?: number
          location: string
          district: string
          region: string
          status?: 'disponible' | 'loué' | 'vendu' | 'en_négociation'
          images?: string[]
          agent_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: 'appartement' | 'maison' | 'terrain' | 'bureau' | 'commerce'
          price?: number
          surface?: number
          bedrooms?: number
          bathrooms?: number
          location?: string
          district?: string
          region?: string
          status?: 'disponible' | 'loué' | 'vendu' | 'en_négociation'
          images?: string[]
          agent_id?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Property = Database['public']['Tables']['properties']['Row']