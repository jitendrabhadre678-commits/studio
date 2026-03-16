export type GiftCard = {
  id: string;
  brand: string;
  slug: string;
  category: string;
  description: string;
  values: string[];
  image: string;
  imageUrl?: string; // Support for direct image URLs
  trending?: boolean;
  featured?: boolean;
};

export const categories = [
  "Shopping", "Gaming", "Digital", "Entertainment", "Food", "Transport", "Payments"
];

export const giftCards: GiftCard[] = [
  // Shopping
  { id: '1', brand: 'Amazon', slug: 'amazon-gift-card', category: 'Shopping', description: 'Unlock millions of items with an Amazon reward.', values: ['$10', '$25', '$50', '$100'], image: 'amazon', trending: true, featured: true },
  { id: '13', brand: 'Walmart', slug: 'walmart-gift-card', category: 'Shopping', description: 'Get everything you need from the world\'s largest retailer.', values: ['$25', '$50', '$100'], image: 'walmart' },
  { id: '14', brand: 'Target', slug: 'target-gift-card', category: 'Shopping', description: 'Style, home, and more with Target rewards.', values: ['$15', '$25', '$50'], image: 'target' },
  { id: '15', brand: 'Best Buy', slug: 'best-buy-gift-card', category: 'Shopping', description: 'Upgrade your tech with Best Buy credit.', values: ['$25', '$50', '$100'], image: 'best-buy' },
  { id: '16', brand: 'eBay', slug: 'ebay-gift-card', category: 'Shopping', description: 'Bid and buy unique items globally.', values: ['$10', '$25', '$50'], image: 'ebay' },
  
  // Gaming
  { id: '2', brand: 'Steam', slug: 'steam-gift-card', category: 'Gaming', description: 'Access thousands of PC games instantly.', values: ['$10', '$25', '$50', '$100'], image: 'steam', trending: true, featured: true },
  { id: '9', brand: 'Roblox', slug: 'roblox-gift-card', category: 'Gaming', description: 'Get Robux to upgrade your avatar and experiences.', values: ['$10', '$25', '$50'], image: 'roblox', trending: true },
  { id: '4', brand: 'PlayStation', slug: 'playstation-gift-card', category: 'Gaming', description: 'Download the latest PS5 and PS4 titles.', values: ['$10', '$25', '$50', '$100'], image: 'playstation', featured: true },
  { id: '3', brand: 'Xbox', slug: 'xbox-gift-card', category: 'Gaming', description: 'Play hundreds of high-quality games on console.', values: ['$10', '$25', '$50', '$100'], image: 'xbox', featured: true },
  { id: '17', brand: 'Nintendo', slug: 'nintendo-gift-card', category: 'Gaming', description: 'Games for Switch, 3DS, and Wii U.', values: ['$10', '$20', '$50'], image: 'nintendo' },
  { id: '12', brand: 'Fortnite', slug: 'fortnite-gift-card', category: 'Gaming', description: 'V-Bucks for new skins and battle passes.', values: ['$10', '$25', '$50'], image: 'fortnite' },

  // Digital
  { id: '5', brand: 'Google Play', slug: 'google-play-gift-card', category: 'Digital', description: 'Apps, games, and more on the Android store.', values: ['$10', '$25', '$50'], image: 'google-play', trending: true, featured: true },
  { id: '6', brand: 'Apple App Store', slug: 'apple-app-store-gift-card', category: 'Digital', description: 'Millions of apps on the iOS App Store.', values: ['$10', '$25', '$50', '$100'], image: 'apple' },
  { id: '18', brand: 'iTunes', slug: 'itunes-gift-card', category: 'Digital', description: 'Music, movies, and TV shows on Apple devices.', values: ['$10', '$15', '$25'], image: 'itunes' },

  // Entertainment
  { id: '10', brand: 'Netflix', slug: 'netflix-gift-card', category: 'Entertainment', description: 'Stream your favorite movies and shows.', values: ['$15', '$25', '$50'], image: 'netflix', trending: true },
  { id: '19', brand: 'Spotify', slug: 'spotify-gift-card', category: 'Entertainment', description: 'Premium music streaming without ads.', values: ['$10', '$30', '$60'], image: 'spotify' },
  { id: '20', brand: 'Disney+', slug: 'disney-plus-gift-card', category: 'Entertainment', description: 'The best of Disney, Pixar, Marvel, and more.', values: ['$15', '$25', '$50'], image: 'disney' },

  // Food
  { id: '8', brand: 'Starbucks', slug: 'starbucks-gift-card', category: 'Food', description: 'Treat yourself to premium coffee and snacks.', values: ['$10', '$25', '$50'], image: 'starbucks', featured: true },
  { id: '21', brand: 'McDonald\'s', slug: 'mcdonalds-gift-card', category: 'Food', description: 'Enjoy your favorite fast food rewards.', values: ['$10', '$25', '$50'], image: 'mcdonalds' },
  { id: '22', brand: 'DoorDash', slug: 'door-dash-gift-card', category: 'Food', description: 'Delicious meals delivered to your door.', values: ['$25', '$50', '$100'], image: 'doordash' },

  // Transport
  { id: '23', brand: 'Uber', slug: 'uber-gift-card', category: 'Transport', description: 'Rides and meals with Uber and Uber Eats.', values: ['$25', '$50', '$100'], image: 'uber' },

  // Payments
  { id: '11', brand: 'PayPal Reward', slug: 'paypal-reward-card', category: 'Payments', description: 'Get cash rewards directly to your PayPal account.', values: ['$10', '$25', '$50', '$100'], image: 'paypal', trending: true },
  { id: '24', brand: 'Visa Gift Card', slug: 'visa-gift-card', category: 'Payments', description: 'Spend anywhere Visa is accepted worldwide.', values: ['$25', '$50', '$100'], image: 'visa' },
];