import fs from 'fs';

const generateLongBeachSpots = (count = 50) => {
  const city = {
    name: 'Long Beach',
    state: 'CA',
    lat: 33.7701,
    lng: -118.1937
  };

  const spots = [];
  const namePrefixes = ['Study Bar', 'Cafe Nook', 'Quiet Grind', 'Focus Room', 'Latte Lounge'];
  const tagOptions = ['wifi', 'quiet', 'coffee', 'outlets', 'cozy'];

  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    const latitude = city.lat + latOffset;
    const longitude = city.lng + lngOffset;

    const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
    const name = `${prefix} ${i + 1} – ${city.name}`;
    const tags = tagOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    const rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
    const address = `${Math.floor(Math.random() * 9000)} ${city.name} Blvd, ${city.name}, ${city.state}`;
    const hours = '8:00 AM - 9:00 PM';
    const description = `A productive space in ${city.name}.`;

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

const longBeachSpots = generateLongBeachSpots(50);
fs.writeFileSync('./data/spots-longbeach.json', JSON.stringify(longBeachSpots, null, 2));
console.log('✅ Generated 50 Long Beach study spots in spots-longbeach.json');
