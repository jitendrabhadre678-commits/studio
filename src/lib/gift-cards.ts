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

export const giftCards: GiftCard[] = [
  { 
    id: 'amazon', 
    brand: 'Amazon', 
    slug: 'amazon-gift-card', 
    category: 'Shopping', 
    description: 'Unlock millions of items with an Amazon reward.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'amazon', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png',
    glowColor: '#FF9900',
    trending: true, 
    featured: true,
    gradient: 'linear-gradient(135deg, #131921 0%, #FF9900 100%)'
  },
  { 
    id: 'steam', 
    brand: 'Steam', 
    slug: 'steam-gift-card', 
    category: 'Gaming', 
    description: 'Access thousands of PC games instantly.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'steam', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png',
    glowColor: '#66C0F4',
    trending: true, 
    featured: true,
    gradient: 'linear-gradient(135deg, #171A21 0%, #66C0F4 100%)'
  },
  { 
    id: 'roblox', 
    brand: 'Roblox', 
    slug: 'roblox-gift-card', 
    category: 'Gaming', 
    description: 'Get Robux to upgrade your avatar and experiences.', 
    values: ['$10', '$25', '$50'], 
    image: 'roblox', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png',
    glowColor: '#E3191E',
    trending: true,
    gradient: 'linear-gradient(135deg, #000000 0%, #E3191E 100%)'
  },
  { 
    id: 'playstation', 
    brand: 'PlayStation', 
    slug: 'playstation-gift-card', 
    category: 'Gaming', 
    description: 'Download the latest PS5 and PS4 titles.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'playstation', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png',
    glowColor: '#003087',
    featured: true,
    gradient: 'linear-gradient(135deg, #003087 0%, #6A0DAD 100%)'
  },
  { 
    id: 'xbox', 
    brand: 'Xbox', 
    slug: 'xbox-gift-card', 
    category: 'Gaming', 
    description: 'Play hundreds of high-quality games on console.', 
    values: ['$10', '$25', '$50', '$100'], 
    image: 'xbox', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png',
    glowColor: '#107C10',
    featured: true,
    gradient: 'linear-gradient(135deg, #107C10 0%, #054B05 100%)'
  },
  { 
    id: 'google-play', 
    brand: 'Google Play', 
    slug: 'google-play-gift-card', 
    category: 'Digital', 
    description: 'Apps, games, and more on the Android store.', 
    values: ['$10', '$25', '$50'], 
    image: 'google-play', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png',
    glowColor: '#34A853',
    trending: true, 
    featured: true,
    gradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)'
  },
  { 
    id: 'fortnite', 
    brand: 'Fortnite', 
    slug: 'fortnite-gift-card', 
    category: 'Gaming', 
    description: 'Get V-Bucks for the latest skins and emotes.', 
    values: ['$10', '$25', '$50'], 
    image: 'fortnite', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png',
    glowColor: '#A855F7',
    gradient: 'linear-gradient(135deg, #000000 0%, #A855F7 100%)'
  },
  { 
    id: 'nintendo', 
    brand: 'Nintendo', 
    slug: 'nintendo-gift-card', 
    category: 'Gaming', 
    description: 'Jump into your next adventure with Nintendo.', 
    values: ['$10', '$20', '$50'], 
    image: 'nintendo', 
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463546/4_20260406_134035_0003_jvi4ke.png',
    glowColor: '#E3191E',
    gradient: 'linear-gradient(135deg, #E3191E 0%, #000000 100%)'
  },
  { 
    id: 'walmart', 
    brand: 'Walmart', 
    slug: 'walmart-gift-card', 
    category: 'Shopping', 
    description: 'Shop for everything you need at Walmart.', 
    values: ['$25', '$50', '$100'], 
    image: 'walmart',
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png',
    glowColor: '#0071CE',
    gradient: 'linear-gradient(135deg, #0071CE 0%, #FFC220 100%)'
  },
  { 
    id: 'target', 
    brand: 'Target', 
    slug: 'target-gift-card', 
    category: 'Shopping', 
    description: 'Style, home, and more with Target rewards.', 
    values: ['$15', '$25', '$50'], 
    image: 'target',
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png',
    glowColor: '#CC0000',
    gradient: 'linear-gradient(135deg, #CC0000 0%, #808080 100%)'
  },
  { 
    id: 'best-buy', 
    brand: 'Best Buy', 
    slug: 'best-buy-gift-card', 
    category: 'Shopping', 
    description: 'Upgrade your tech with Best Buy credit.', 
    values: ['$25', '$50', '$100'], 
    image: 'best-buy',
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/8_20260406_134035_0007_jumtpc.png',
    glowColor: '#EAB308',
    gradient: 'linear-gradient(135deg, #0046BE 0%, #FFF200 100%)'
  },
  { 
    id: 'ebay', 
    brand: 'eBay', 
    slug: 'ebay-gift-card', 
    category: 'Shopping', 
    description: 'Shop for unique items on the world auction house.', 
    values: ['$10', '$25', '$50'], 
    image: 'ebay',
    logoUrl: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463541/5_20260406_134035_0004_nikubw.png',
    glowColor: 'linear-gradient(to right, #E53238, #0064D2, #F5AF02, #86B817)',
    gradient: 'linear-gradient(135deg, #E53238 0%, #0064D2 33%, #F5AF02 66%, #86B817 100%)'
  },
];
