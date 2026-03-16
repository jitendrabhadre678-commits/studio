export type GiftCard = {
  id: string;
  brand: string;
  slug: string;
  category: string;
  values: string[];
  image: string;
  trending?: boolean;
  featured?: boolean;
};

export const categories = [
  "Shopping", "Gaming", "Digital", "Entertainment", "Food", "Transport", "Payments"
];

export const giftCards: GiftCard[] = [
  { id: '1', brand: 'Amazon', slug: 'amazon-gift-card', category: 'Shopping', values: ['$10', '$25', '$50', '$100'], image: 'amazon', trending: true, featured: true },
  { id: '2', brand: 'Steam', slug: 'steam-gift-card', category: 'Gaming', values: ['$10', '$25', '$50', '$100'], image: 'steam', trending: true, featured: true },
  { id: '3', brand: 'Xbox', slug: 'xbox-gift-card', category: 'Gaming', values: ['$10', '$25', '$50', '$100'], image: 'xbox', featured: true },
  { id: '4', brand: 'PlayStation', slug: 'playstation-gift-card', category: 'Gaming', values: ['$10', '$25', '$50', '$100'], image: 'playstation', featured: true },
  { id: '5', brand: 'Google Play', slug: 'google-play-gift-card', category: 'Digital', values: ['$10', '$25', '$50'], image: 'google-play', trending: true, featured: true },
  { id: '6', brand: 'Apple', slug: 'apple-gift-card', category: 'Digital', values: ['$10', '$25', '$50', '$100'], image: 'apple', featured: true },
  { id: '7', brand: 'Walmart', slug: 'walmart-gift-card', category: 'Shopping', values: ['$25', '$50', '$100'], image: 'walmart', featured: true },
  { id: '8', brand: 'Starbucks', slug: 'starbucks-gift-card', category: 'Food', values: ['$10', '$25', '$50'], image: 'starbucks', featured: true },
  { id: '9', brand: 'Roblox', slug: 'roblox-gift-card', category: 'Gaming', values: ['$10', '$25', '$50'], image: 'roblox', trending: true },
  { id: '10', brand: 'Netflix', slug: 'netflix-gift-card', category: 'Entertainment', values: ['$15', '$25', '$50'], image: 'netflix', trending: true },
  { id: '11', brand: 'PayPal', slug: 'paypal-gift-card', category: 'Payments', values: ['$10', '$25', '$50', '$100'], image: 'paypal', trending: true },
  { id: '12', brand: 'Fortnite', slug: 'fortnite-gift-card', category: 'Gaming', values: ['$10', '$25', '$50'], image: 'fortnite' },
];
