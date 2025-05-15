// scripts/generateLargeSpotDataset.js
import fs from 'fs';

const cities = [
  { name: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437, weight: 3 },
  { name: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194, weight: 2 },
  { name: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611, weight: 2 },
  { name: 'New York', state: 'NY', lat: 40.7128, lng: -74.006, weight: 1 },
  { name: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321, weight: 1 },
  { name: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298, weight: 1 }
];

const tagOptions = ['wifi', 'quiet', 'coffee', 'outlets', 'cozy', 'late-night'];
const namePrefixes = ['The Nook', 'Bean & Book', 'Quiet Spot', 'Latte Lab', 'Focus Room', 'The Loft', 'Café Study', 'Study Commons', 'The Thinkery', 'Brews & Books'];

const generateSpots = (count = 1000) => {
  const spots = [];
  const weightedCities = cities.flatMap(city => Array(city.weight).fill(city));

  for (let i = 0; i < count; i++) {
    const city = weightedCities[Math.floor(Math.random() * weightedCities.length)];
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    const latitude = city.lat + latOffset;
    const longitude = city.lng + lngOffset;

    const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
    const name = `${prefix} – ${city.name}`;
    const tags = tagOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    const rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
    const address = `${Math.floor(Math.random() * 9000)} ${city.name} Ave, ${city.name}, ${city.state}`;
    const hours = '8:00 AM - 9:00 PM';
    const description = `A great place to focus in ${city.name}.`;

    spots.push({
      name,
      city: city.name,
      tags,
      rating,
      address,
      hours,
      description,
      latitude,
      longitude,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });
  }
  return spots;
};

const spots = generateSpots(1000);
fs.writeFileSync('./data/spots-large.json', JSON.stringify(spots, null, 2));
console.log('✅ Generated 1000 realistic study spots in spots-large.json');
