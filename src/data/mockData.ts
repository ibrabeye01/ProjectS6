export interface MockUser {
  id: string
  full_name: string
  email: string
  phone?: string
  role: 'admin' | 'agent' | 'client'
}

export interface MockProperty {
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
  agent_id?: string
}

export const mockUsers: MockUser[] = [
  {
    id: 'admin_1',
    full_name: 'Ibra Beye',
    email: 'admin@immosenegal.com',
    phone: '+221 77 123 45 67',
    role: 'admin'
  },
  {
    id: 'admin_2',
    full_name: 'Administrateur Démo',
    email: 'admin.demo@immosenegal.com',
    phone: '+221 77 000 00 01',
    role: 'admin'
  },
  {
    id: 'agent_1',
    full_name: 'Mariama Sow',
    email: 'mariama@immosenegal.com',
    phone: '+221 77 234 56 78',
    role: 'agent'
  },
  {
    id: 'agent_2',
    full_name: 'Abib Ifra Sy',
    email: 'abib@immosenegal.com',
    phone: '+221 77 345 67 89',
    role: 'agent'
  },
  {
    id: 'agent_3',
    full_name: 'Agent Démo',
    email: 'agent.demo@immosenegal.com',
    phone: '+221 77 000 00 02',
    role: 'agent'
  },
  {
    id: 'client_1',
    full_name: 'Absa Seck',
    email: 'absa@email.com',
    phone: '+221 77 456 78 90',
    role: 'client'
  },
  {
    id: 'client_2',
    full_name: 'Client Démo',
    email: 'client.demo@immosenegal.com',
    phone: '+221 77 000 00 03',
    role: 'client'
  }
]

export const mockProperties: MockProperty[] = [
  {
    id: 'prop_1',
    title: 'Villa moderne avec piscine - Almadies',
    description: 'Magnifique villa de 4 chambres avec piscine, jardin et vue sur mer. Quartier résidentiel calme et sécurisé.',
    type: 'maison',
    price: 450000000,
    surface: 350,
    bedrooms: 4,
    bathrooms: 3,
    location: 'Almadies',
    district: 'Almadies',
    region: 'Dakar',
    status: 'disponible',
    images: ['/vente-villa-avec-piscine-ngaparou-4909044200.jpg'],
    agent_id: 'agent_1'
  },
  {
    id: 'prop_2',
    title: 'Appartement 3 pièces - Plateau',
    description: 'Bel appartement au cœur du Plateau, proche des commerces et transports. Idéal pour jeune couple.',
    type: 'appartement',
    price: 85000000,
    surface: 85,
    bedrooms: 2,
    bathrooms: 1,
    location: 'Plateau',
    district: 'Plateau',
    region: 'Dakar',
    status: 'disponible',
    images: ['/appartement avec piscine.jpeg'],
    agent_id: 'agent_2'
  },
  {
    id: 'prop_3',
    title: 'Terrain constructible - Saly',
    description: 'Terrain de 800m² dans une zone résidentielle de Saly, proche de la plage. Idéal pour construction villa.',
    type: 'terrain',
    price: 120000000,
    surface: 800,
    bedrooms: 0,
    bathrooms: 0,
    location: 'Saly',
    district: 'Saly',
    region: 'Thiès',
    status: 'disponible',
    images: ['/vente-villa-saly-4332581700.jpg'],
    agent_id: 'agent_1'
  },
  {
    id: 'prop_4',
    title: 'Bureau moderne - Mermoz',
    description: 'Espace de bureau de 120m² dans un immeuble moderne avec parking et sécurité 24h/24.',
    type: 'bureau',
    price: 95000000,
    surface: 120,
    bedrooms: 0,
    bathrooms: 2,
    location: 'Mermoz',
    district: 'Mermoz',
    region: 'Dakar',
    status: 'loué',
    images: ['/maisson a vendre.jpg'],
    agent_id: 'agent_2'
  },
  {
    id: 'prop_5',
    title: 'Maison familiale - Thiès',
    description: 'Grande maison familiale de 5 chambres avec jardin, garage et terrasse. Quartier calme.',
    type: 'maison',
    price: 180000000,
    surface: 280,
    bedrooms: 5,
    bathrooms: 3,
    location: 'Centre-ville',
    district: 'Centre',
    region: 'Thiès',
    status: 'en_négociation',
    images: ['/maison a louer.jpeg'],
    agent_id: 'agent_1'
  },
  {
    id: 'prop_6',
    title: 'Local commercial - Sandaga',
    description: 'Local commercial bien situé au marché Sandaga, idéal pour commerce de détail.',
    type: 'commerce',
    price: 65000000,
    surface: 45,
    bedrooms: 0,
    bathrooms: 1,
    location: 'Sandaga',
    district: 'Médina',
    region: 'Dakar',
    status: 'vendu',
    images: ['/appartement avec piscine.jpeg'],
    agent_id: 'agent_2'
  }
]

export const mockStats = {
  totalProperties: mockProperties.length,
  availableProperties: mockProperties.filter(p => p.status === 'disponible').length,
  soldProperties: mockProperties.filter(p => p.status === 'vendu').length,
  rentedProperties: mockProperties.filter(p => p.status === 'loué').length,
  totalValue: mockProperties.reduce((sum, property) => {
    if (property.status === 'vendu' || property.status === 'loué') {
      return sum + property.price
    }
    return sum
  }, 0),
  regionStats: mockProperties.reduce((acc, property) => {
    acc[property.region] = (acc[property.region] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}