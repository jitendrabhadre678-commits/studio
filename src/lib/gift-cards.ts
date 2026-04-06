export type GiftCard = {
  id: string;
  brand: string;
  slug: string;
  category: string;
  description: string;
  values: string[];
  image: string;
  imageUrl?: string;
  logoUrl?: string;
  glowColor?: string;
  trending?: boolean;
  featured?: boolean;
  gradient: string; // CSS linear-gradient string
};

export const categories = [
  "Shopping", "Gaming", "Digital", "Entertainment", "Food", "Transport", "Payments"
];

// The primary high-fidelity logo provided by the user
const PRIMARY_LOGO = 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775460293/IMG_20260406_124849_dgnvdv.png';

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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#FF9900',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#0071CE',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#CC0000',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#0046BE',
    gradient: 'linear-gradient(135deg, #0046BE 0%, #FFF200 100%)'
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#66C0F4',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#E3191E',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#003087',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#107C10',
    featured: true,
    gradient: 'linear-gradient(135deg, #107C10 0%, #054B05 100%)'
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#34A853',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#A2AAAD',
    gradient: 'linear-gradient(135deg, #000000 0%, #A2AAAD 100%)'
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#E50914',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#1DB954',
    gradient: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)'
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#00704A',
    featured: true,
    gradient: 'linear-gradient(135deg, #00704A 0%, #D4E9E2 100%)'
  },
  { 
    id: '22', 
    brand: 'DoorDash', 
    slug: 'door-dash-gift-card', 
    category: 'Food', 
    description: 'Delicious meals delivered to your door.', 
    values: ['$25', '$50', '$100'], 
    image: 'doordash',
    logoUrl: PRIMARY_LOGO,
    glowColor: '#FF3008',
    gradient: 'linear-gradient(135deg, #FF3008 0%, #FF6B00 100%)'
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#003087',
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
    logoUrl: PRIMARY_LOGO,
    glowColor: '#1A1F71',
    gradient: 'linear-gradient(135deg, #1A1F71 0%, #F7B600 100%)'
  },
];
