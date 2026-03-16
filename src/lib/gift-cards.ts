export type GiftCard = {
  id: string;
  brand: string;
  slug: string;
  category: string;
  description: string;
  values: string[];
  image: string;
  imageUrl?: string;
  trending?: boolean;
  featured?: boolean;
  gradient: string; // CSS linear-gradient string
};

export const categories = [
  "Shopping", "Gaming", "Digital", "Entertainment", "Food", "Transport", "Payments"
];

export const giftCards: GiftCard[] = [
  // Shopping
  { 
    id: '1', 
    brand: 'Amazon', 
    slug: 'amazon-gift-card', 
    category: 'Shopping', 
    description: 'Unlock millions of items with an Amazon reward.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'amazon', 
    trending: true, 
    featured: true,
    gradient: 'linear-gradient(135deg, #131921 0%, #FF9900 100%)'
  },
  { 
    id: '13', 
    brand: 'Walmart', 
    slug: 'walmart-gift-card', 
    category: 'Shopping', 
    description: 'Get everything you need from the world\'s largest retailer.', 
    values: ['$25', '$50', '$100'], 
    image: 'walmart',
    gradient: 'linear-gradient(135deg, #0071CE 0%, #FFC220 100%)'
  },
  { 
    id: '14', 
    brand: 'Target', 
    slug: 'target-gift-card', 
    category: 'Shopping', 
    description: 'Style, home, and more with Target rewards.', 
    values: ['$15', '$25', '$50'], 
    image: 'target',
    gradient: 'linear-gradient(135deg, #CC0000 0%, #808080 100%)'
  },
  { 
    id: '15', 
    brand: 'Best Buy', 
    slug: 'best-buy-gift-card', 
    category: 'Shopping', 
    description: 'Upgrade your tech with Best Buy credit.', 
    values: ['$25', '$50', '$100'], 
    image: 'best-buy',
    gradient: 'linear-gradient(135deg, #0046BE 0%, #FFF200 100%)'
  },
  { 
    id: '16', 
    brand: 'eBay', 
    slug: 'ebay-gift-card', 
    category: 'Shopping', 
    description: 'Bid and buy unique items globally.', 
    values: ['$10', '$25', '$50'], 
    image: 'ebay',
    gradient: 'linear-gradient(135deg, #e53238 0%, #0064d2 33%, #f5af02 66%, #86b817 100%)'
  },
  
  // Gaming
  { 
    id: '2', 
    brand: 'Steam', 
    slug: 'steam-gift-card', 
    category: 'Gaming', 
    description: 'Access thousands of PC games instantly.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'steam', 
    trending: true, 
    featured: true,
    gradient: 'linear-gradient(135deg, #171A21 0%, #66C0F4 100%)'
  },
  { 
    id: '9', 
    brand: 'Roblox', 
    slug: 'roblox-gift-card', 
    category: 'Gaming', 
    description: 'Get Robux to upgrade your avatar and experiences.', 
    values: ['$10', '$25', '$50'], 
    image: 'roblox', 
    trending: true,
    gradient: 'linear-gradient(135deg, #000000 0%, #E3191E 100%)'
  },
  { 
    id: '4', 
    brand: 'PlayStation', 
    slug: 'playstation-gift-card', 
    category: 'Gaming', 
    description: 'Download the latest PS5 and PS4 titles.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'playstation', 
    featured: true,
    gradient: 'linear-gradient(135deg, #003087 0%, #6A0DAD 100%)'
  },
  { 
    id: '3', 
    brand: 'Xbox', 
    slug: 'xbox-gift-card', 
    category: 'Gaming', 
    description: 'Play hundreds of high-quality games on console.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'xbox', 
    featured: true,
    gradient: 'linear-gradient(135deg, #107C10 0%, #054B05 100%)'
  },
  { 
    id: '17', 
    brand: 'Nintendo', 
    slug: 'nintendo-gift-card', 
    category: 'Gaming', 
    description: 'Games for Switch, 3DS, and Wii U.', 
    values: ['$10', '$20', '$50'], 
    image: 'nintendo',
    gradient: 'linear-gradient(135deg, #E60012 0%, #FFFFFF 100%)'
  },
  { 
    id: '12', 
    brand: 'Fortnite', 
    slug: 'fortnite-gift-card', 
    category: 'Gaming', 
    description: 'V-Bucks for new skins and battle passes.', 
    values: ['$10', '$25', '$50'], 
    image: 'fortnite',
    gradient: 'linear-gradient(135deg, #9D4EDD 0%, #0077B6 100%)'
  },

  // Digital
  { 
    id: '5', 
    brand: 'Google Play', 
    slug: 'google-play-gift-card', 
    category: 'Digital', 
    description: 'Apps, games, and more on the Android store.', 
    values: ['$10', '$25', '$50'], 
    image: 'google-play', 
    trending: true, 
    featured: true,
    gradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)'
  },
  { 
    id: '6', 
    brand: 'Apple Store', 
    slug: 'apple-app-store-gift-card', 
    category: 'Digital', 
    description: 'Millions of apps on the iOS App Store.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'apple',
    gradient: 'linear-gradient(135deg, #000000 0%, #A2AAAD 100%)'
  },
  { 
    id: '18', 
    brand: 'iTunes', 
    slug: 'itunes-gift-card', 
    category: 'Digital', 
    description: 'Music, movies, and TV shows on Apple devices.', 
    values: ['$10', '$15', '$25'], 
    image: 'itunes',
    gradient: 'linear-gradient(135deg, #FF00FF 0%, #00FFFF 100%)'
  },

  // Entertainment
  { 
    id: '10', 
    brand: 'Netflix', 
    slug: 'netflix-gift-card', 
    category: 'Entertainment', 
    description: 'Stream your favorite movies and shows.', 
    values: ['$15', '$25', '$50'], 
    image: 'netflix', 
    trending: true,
    gradient: 'linear-gradient(135deg, #000000 0%, #E50914 100%)'
  },
  { 
    id: '19', 
    brand: 'Spotify', 
    slug: 'spotify-gift-card', 
    category: 'Entertainment', 
    description: 'Premium music streaming without ads.', 
    values: ['$10', '$30', '$60'], 
    image: 'spotify',
    gradient: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)'
  },
  { 
    id: '20', 
    brand: 'Disney+', 
    slug: 'disney-plus-gift-card', 
    category: 'Entertainment', 
    description: 'The best of Disney, Pixar, Marvel, and more.', 
    values: ['$15', '$25', '$50'], 
    image: 'disney',
    gradient: 'linear-gradient(135deg, #113CCF 0%, #200444 100%)'
  },

  // Food
  { 
    id: '8', 
    brand: 'Starbucks', 
    slug: 'starbucks-gift-card', 
    category: 'Food', 
    description: 'Treat yourself to premium coffee and snacks.', 
    values: ['$10', '$25', '$50'], 
    image: 'starbucks', 
    featured: true,
    gradient: 'linear-gradient(135deg, #00704A 0%, #D4E9E2 100%)'
  },
  { 
    id: '21', 
    brand: 'McDonald\'s', 
    slug: 'mcdonalds-gift-card', 
    category: 'Food', 
    description: 'Enjoy your favorite fast food rewards.', 
    values: ['$10', '$25', '$50'], 
    image: 'mcdonalds',
    gradient: 'linear-gradient(135deg, #DA291C 0%, #FFC72C 100%)'
  },
  { 
    id: '22', 
    brand: 'DoorDash', 
    slug: 'door-dash-gift-card', 
    category: 'Food', 
    description: 'Delicious meals delivered to your door.', 
    values: ['$25', '$50', '$100'], 
    image: 'doordash',
    gradient: 'linear-gradient(135deg, #FF3008 0%, #FF6B00 100%)'
  },

  // Transport
  { 
    id: '23', 
    brand: 'Uber', 
    slug: 'uber-gift-card', 
    category: 'Transport', 
    description: 'Rides and meals with Uber and Uber Eats.', 
    values: ['$25', '$50', '$100'], 
    image: 'uber',
    gradient: 'linear-gradient(135deg, #000000 0%, #555555 100%)'
  },

  // Payments
  { 
    id: '11', 
    brand: 'PayPal Reward', 
    slug: 'paypal-reward-card', 
    category: 'Payments', 
    description: 'Get cash rewards directly to your PayPal account.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'paypal', 
    trending: true,
    gradient: 'linear-gradient(135deg, #003087 0%, #009CDE 100%)'
  },
  { 
    id: '24', 
    brand: 'Visa Gift Card', 
    slug: 'visa-gift-card', 
    category: 'Payments', 
    description: 'Spend anywhere Visa is accepted worldwide.', 
    values: ['$25', '$50', '$100'], 
    image: 'visa',
    gradient: 'linear-gradient(135deg, #1A1F71 0%, #F7B600 100%)'
  },
  { 
    id: '25', 
    brand: 'Vanilla Card', 
    slug: 'vanilla-gift-card', 
    category: 'Payments', 
    description: 'Flexible digital reward for all your online needs.', 
    values: ['$25', '$50', '$100'], 
    image: 'vanilla',
    gradient: 'linear-gradient(135deg, #7b2cbf 0%, #ff4d6d 100%)'
  },
];