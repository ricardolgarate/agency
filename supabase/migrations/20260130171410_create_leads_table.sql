/*
  # Create leads table for video editing agency

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `name` (text, required)
      - `company` (text)
      - `budget` (text, required) - Budget range
      - `authority` (text, required) - Decision making authority
      - `need` (text, required) - Specific video editing needs
      - `timeline` (text, required) - When they need to start
      - `qualified` (boolean) - Whether they passed BANT qualification
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `leads` table
    - Add policy for public inserts (for lead capture)
    - Add policy for authenticated users to read leads (for agency staff)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  company text,
  budget text NOT NULL,
  authority text NOT NULL,
  need text NOT NULL,
  timeline text NOT NULL,
  qualified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);