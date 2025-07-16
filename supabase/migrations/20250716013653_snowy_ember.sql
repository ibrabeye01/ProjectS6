/*
  # Create properties table

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `type` (enum: appartement, maison, terrain, bureau, commerce)
      - `price` (bigint)
      - `surface` (integer, optional)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `location` (text)
      - `district` (text)
      - `region` (text)
      - `status` (enum: disponible, loué, vendu, en_négociation)
      - `images` (text array, optional)
      - `agent_id` (uuid, references profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `properties` table
    - Add policies for public read access to available properties
    - Add policies for agents to manage their own properties
    - Add policies for admins to manage all properties
*/

-- Create enums
CREATE TYPE property_type AS ENUM ('appartement', 'maison', 'terrain', 'bureau', 'commerce');
CREATE TYPE property_status AS ENUM ('disponible', 'loué', 'vendu', 'en_négociation');

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type property_type NOT NULL,
  price bigint NOT NULL,
  surface integer,
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  location text NOT NULL,
  district text NOT NULL,
  region text NOT NULL,
  status property_status DEFAULT 'disponible',
  images text[],
  agent_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read available properties"
  ON properties
  FOR SELECT
  TO anon, authenticated
  USING (status = 'disponible');

CREATE POLICY "Authenticated users can read all properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Agents can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (
    agent_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('agent', 'admin')
    )
  );

CREATE POLICY "Agents can update their own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (
    agent_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('agent', 'admin')
    )
  );

CREATE POLICY "Agents can delete their own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (
    agent_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('agent', 'admin')
    )
  );

CREATE POLICY "Admins can manage all properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();