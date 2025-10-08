export const AVAILABLE_CITIES = [
  // France
  { name: 'Paris', country: 'France', region: 'Île-de-France' },
  { name: 'Marseille', country: 'France', region: 'Provence-Alpes-Côte d\'Azur' },
  { name: 'Lyon', country: 'France', region: 'Auvergne-Rhône-Alpes' },
  { name: 'Toulouse', country: 'France', region: 'Occitanie' },
  { name: 'Nice', country: 'France', region: 'Provence-Alpes-Côte d\'Azur' },
  { name: 'Nantes', country: 'France', region: 'Pays de la Loire' },
  { name: 'Bordeaux', country: 'France', region: 'Nouvelle-Aquitaine' },
  { name: 'Lille', country: 'France', region: 'Hauts-de-France' },
  { name: 'Strasbourg', country: 'France', region: 'Grand Est' },
  { name: 'Rennes', country: 'France', region: 'Bretagne' },
  
  // Europe
  { name: 'London', country: 'United Kingdom', region: 'England' },
  { name: 'Manchester', country: 'United Kingdom', region: 'England' },
  { name: 'Berlin', country: 'Germany', region: 'Berlin' },
  { name: 'Munich', country: 'Germany', region: 'Bavaria' },
  { name: 'Hamburg', country: 'Germany', region: 'Hamburg' },
  { name: 'Madrid', country: 'Spain', region: 'Madrid' },
  { name: 'Barcelona', country: 'Spain', region: 'Catalonia' },
  { name: 'Rome', country: 'Italy', region: 'Lazio' },
  { name: 'Milan', country: 'Italy', region: 'Lombardy' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'North Holland' },
  { name: 'Brussels', country: 'Belgium', region: 'Brussels' },
  { name: 'Vienna', country: 'Austria', region: 'Vienna' },
  { name: 'Prague', country: 'Czech Republic', region: 'Prague' },
  { name: 'Lisbon', country: 'Portugal', region: 'Lisbon' },
  { name: 'Warsaw', country: 'Poland', region: 'Masovia' },
  { name: 'Budapest', country: 'Hungary', region: 'Budapest' },
  { name: 'Stockholm', country: 'Sweden', region: 'Stockholm' },
  { name: 'Copenhagen', country: 'Denmark', region: 'Capital Region' },
  { name: 'Oslo', country: 'Norway', region: 'Oslo' },
  { name: 'Helsinki', country: 'Finland', region: 'Uusimaa' },
  { name: 'Athens', country: 'Greece', region: 'Attica' },
  { name: 'Dublin', country: 'Ireland', region: 'Leinster' },
  
  // Amérique du Nord
  { name: 'New York', country: 'United States', region: 'New York' },
  { name: 'Los Angeles', country: 'United States', region: 'California' },
  { name: 'Chicago', country: 'United States', region: 'Illinois' },
  { name: 'Houston', country: 'United States', region: 'Texas' },
  { name: 'Miami', country: 'United States', region: 'Florida' },
  { name: 'San Francisco', country: 'United States', region: 'California' },
  { name: 'Seattle', country: 'United States', region: 'Washington' },
  { name: 'Boston', country: 'United States', region: 'Massachusetts' },
  { name: 'Las Vegas', country: 'United States', region: 'Nevada' },
  { name: 'Toronto', country: 'Canada', region: 'Ontario' },
  { name: 'Montreal', country: 'Canada', region: 'Quebec' },
  { name: 'Vancouver', country: 'Canada', region: 'British Columbia' },
  { name: 'Mexico City', country: 'Mexico', region: 'Mexico City' },
  
  // Amérique du Sud
  { name: 'Buenos Aires', country: 'Argentina', region: 'Buenos Aires' },
  { name: 'Sao Paulo', country: 'Brazil', region: 'São Paulo' },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'Rio de Janeiro' },
  { name: 'Lima', country: 'Peru', region: 'Lima' },
  { name: 'Bogota', country: 'Colombia', region: 'Bogotá' },
  { name: 'Santiago', country: 'Chile', region: 'Santiago Metropolitan' },
  
  // Asie
  { name: 'Tokyo', country: 'Japan', region: 'Tokyo' },
  { name: 'Osaka', country: 'Japan', region: 'Osaka' },
  { name: 'Seoul', country: 'South Korea', region: 'Seoul' },
  { name: 'Beijing', country: 'China', region: 'Beijing' },
  { name: 'Shanghai', country: 'China', region: 'Shanghai' },
  { name: 'Hong Kong', country: 'Hong Kong', region: 'Hong Kong' },
  { name: 'Singapore', country: 'Singapore', region: 'Singapore' },
  { name: 'Bangkok', country: 'Thailand', region: 'Bangkok' },
  { name: 'Dubai', country: 'United Arab Emirates', region: 'Dubai' },
  { name: 'Mumbai', country: 'India', region: 'Maharashtra' },
  { name: 'Delhi', country: 'India', region: 'Delhi' },
  { name: 'Bangalore', country: 'India', region: 'Karnataka' },
  { name: 'Istanbul', country: 'Turkey', region: 'Istanbul' },
  { name: 'Tel Aviv', country: 'Israel', region: 'Tel Aviv' },
  
  // Océanie
  { name: 'Sydney', country: 'Australia', region: 'New South Wales' },
  { name: 'Melbourne', country: 'Australia', region: 'Victoria' },
  { name: 'Brisbane', country: 'Australia', region: 'Queensland' },
  { name: 'Perth', country: 'Australia', region: 'Western Australia' },
  { name: 'Auckland', country: 'New Zealand', region: 'Auckland' },
  
  // Afrique
  { name: 'Cairo', country: 'Egypt', region: 'Cairo' },
  { name: 'Cape Town', country: 'South Africa', region: 'Western Cape' },
  { name: 'Johannesburg', country: 'South Africa', region: 'Gauteng' },
  { name: 'Nairobi', country: 'Kenya', region: 'Nairobi' },
  { name: 'Lagos', country: 'Nigeria', region: 'Lagos' },
  { name: 'Casablanca', country: 'Morocco', region: 'Casablanca-Settat' },
]

// Fonction de recherche avec normalisation
export const searchCities = (query: string, limit: number = 5) => {
  if (!query || query.length < 2) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  
  return AVAILABLE_CITIES
    .filter(city => 
      city.name.toLowerCase().includes(normalizedQuery) ||
      city.country.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, limit)
}

// Villes populaires pour la page d'accueil
export const POPULAR_CITIES = [
  'Paris',
  'London', 
  'Tokyo',
  'New York',
  'Berlin',
  'Sydney'
]