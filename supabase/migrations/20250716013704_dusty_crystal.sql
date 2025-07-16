/*
  # Insert demo data

  1. Demo Users
    - Admin user
    - Agent users
    - Client users

  2. Demo Properties
    - Various property types
    - Different regions
    - Different statuses
*/

-- Insert demo profiles (these will be created when users sign up with auth)
-- We'll create them manually for demo purposes

-- Note: In a real app, these would be created through the auth system
-- For demo purposes, we'll insert them directly

INSERT INTO profiles (id, full_name, email, phone, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Ibra Beye', 'admin@immosenegal.com', '+221 77 123 45 67', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'Mariama Sow', 'mariama@immosenegal.com', '+221 77 234 56 78', 'agent'),
  ('33333333-3333-3333-3333-333333333333', 'Abib Ifra Sy', 'abib@immosenegal.com', '+221 77 345 67 89', 'agent'),
  ('44444444-4444-4444-4444-444444444444', 'Absa Seck', 'absa@email.com', '+221 77 456 78 90', 'client'),
  ('55555555-5555-5555-5555-555555555555', 'Admin Démo', 'admin.demo@immosenegal.com', '+221 77 000 00 01', 'admin'),
  ('66666666-6666-6666-6666-666666666666', 'Agent Démo', 'agent.demo@immosenegal.com', '+221 77 000 00 02', 'agent'),
  ('77777777-7777-7777-7777-777777777777', 'Client Démo', 'client.demo@immosenegal.com', '+221 77 000 00 03', 'client')
ON CONFLICT (id) DO NOTHING;

-- Insert demo properties
INSERT INTO properties (id, title, description, type, price, surface, bedrooms, bathrooms, location, district, region, status, images, agent_id) VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Villa moderne avec piscine - Almadies',
    'Magnifique villa de 4 chambres avec piscine, jardin et vue sur mer. Quartier résidentiel calme et sécurisé.',
    'maison',
    450000000,
    350,
    4,
    3,
    'Almadies',
    'Almadies',
    'Dakar',
    'disponible',
    ARRAY['/vente-villa-avec-piscine-ngaparou-4909044200.jpg'],
    '22222222-2222-2222-2222-222222222222'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Appartement 3 pièces - Plateau',
    'Bel appartement au cœur du Plateau, proche des commerces et transports. Idéal pour jeune couple.',
    'appartement',
    85000000,
    85,
    2,
    1,
    'Plateau',
    'Plateau',
    'Dakar',
    'disponible',
    ARRAY['/appartement avec piscine.jpeg'],
    '33333333-3333-3333-3333-333333333333'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Terrain constructible - Saly',
    'Terrain de 800m² dans une zone résidentielle de Saly, proche de la plage. Idéal pour construction villa.',
    'terrain',
    120000000,
    800,
    0,
    0,
    'Saly',
    'Saly',
    'Thiès',
    'disponible',
    ARRAY['/vente-villa-saly-4332581700.jpg'],
    '22222222-2222-2222-2222-222222222222'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'Bureau moderne - Mermoz',
    'Espace de bureau de 120m² dans un immeuble moderne avec parking et sécurité 24h/24.',
    'bureau',
    95000000,
    120,
    0,
    2,
    'Mermoz',
    'Mermoz',
    'Dakar',
    'loué',
    ARRAY['/maisson a vendre.jpg'],
    '33333333-3333-3333-3333-333333333333'
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'Maison familiale - Thiès',
    'Grande maison familiale de 5 chambres avec jardin, garage et terrasse. Quartier calme.',
    'maison',
    180000000,
    280,
    5,
    3,
    'Centre-ville',
    'Centre',
    'Thiès',
    'en_négociation',
    ARRAY['/maison a louer.jpeg'],
    '22222222-2222-2222-2222-222222222222'
  ),
  (
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    'Local commercial - Sandaga',
    'Local commercial bien situé au marché Sandaga, idéal pour commerce de détail.',
    'commerce',
    65000000,
    45,
    0,
    1,
    'Sandaga',
    'Médina',
    'Dakar',
    'vendu',
    ARRAY['/appartement avec piscine.jpeg'],
    '33333333-3333-3333-3333-333333333333'
  )
ON CONFLICT (id) DO NOTHING;