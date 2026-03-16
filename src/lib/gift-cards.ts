
export type GiftCard = {
  id: string;
  brand: string;
  slug: string;
  category: string;
  values: string[];
  image: string;
  trending?: boolean;
};

export const categories = [
  "Shopping", "Gaming", "Digital", "Entertainment", "Food", "Transport", "Payments"
];

export const giftCards: GiftCard[] = [
  { id: '1', brand: 'Amazon', slug: 'amazon-gift-card', category: 'Shopping', values: ['$10', '$25', '$50', '$100'], image: 'amazon', trending: true },
  { id: '2', brand: 'Steam', slug: 'steam-gift-card', category: 'Gaming', values: ['$10', '$25', '$50', '$100'], image: 'steam', trending: true },
  { id: '3', brand: 'Roblox', slug: 'roblox-gift-card', category: 'Gaming', values: ['$10', '$25', '$50'], image: 'roblox', trending: true },
  { id: '4', brand: 'Netflix', slug: 'netflix-gift-card', category: 'Entertainment', values: ['$15', '$25', '$50'], image: 'netflix', trending: true },
  { id: '5', brand: 'Google Play', slug: 'google-play-gift-card', category: 'Digital', values: ['$10', '$25', '$50'], image: 'google-play', trending: true },
  { id: '6', brand: 'PayPal', slug: 'paypal-gift-card', category: 'Payments', values: ['$10', '$25', '$50', '$100'], image: 'paypal', trending: true },
  { id: '7', brand: 'Walmart', slug: 'walmart-gift-card', category: 'Shopping', values: ['$25', '$50', '$100'], image: 'amazon' },
  { id: '8', brand: 'Fortnite', slug: 'fortnite-gift-card', category: 'Gaming', values: ['$10', '$25', '$50'], image: 'fortnite' },
  { id: '9', brand: 'Apple', slug: 'apple-gift-card', category: 'Digital', values: ['$10', '$25', '$50', '$100'], image: 'apple' },
  { id: '10', brand: 'Starbucks', slug: 'starbucks-gift-card', category: 'Food', values: ['$10', '$25', '$50'], image: 'amazon' },
  { id: '11', brand: 'Uber', slug: 'uber-gift-card', category: 'Transport', values: ['$25', '$50', '$100'], image: 'amazon' },
  { id: '12', brand: 'Visa', slug: 'visa-gift-card', category: 'Payments', values: ['$25', '$50', '$100'], image: 'paypal' },
];
