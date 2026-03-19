export type Review = {
  id: string;
  name: string;
  country: string;
  flag: string;
  value: string;
  rewardBrand: string;
  text: string;
  date: string; // Used for Status/Trust Label
};

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Alex R.',
    country: 'USA',
    flag: '🇺🇸',
    value: '$25',
    rewardBrand: 'Amazon',
    text: 'Got my $25 Amazon reward after completing one offer. Took a few minutes.',
    date: 'Verified User'
  },
  {
    id: '2',
    name: 'Liam K.',
    country: 'UK',
    flag: '🇬🇧',
    value: '$10',
    rewardBrand: 'Steam',
    text: "Didn't expect it to work, but I received my $10 gift card. Pretty smooth process.",
    date: 'Reward Received'
  },
  {
    id: '3',
    name: 'Noah M.',
    country: 'Canada',
    flag: '🇨🇦',
    value: '$15',
    rewardBrand: 'Target',
    text: 'Completed a quick task and unlocked a $15 reward. Simple and fast.',
    date: 'Successful Claim'
  },
  {
    id: '4',
    name: 'Lucas D.',
    country: 'Germany',
    flag: '🇩🇪',
    value: '$20',
    rewardBrand: 'Google Play',
    text: 'Nice platform, rewards are real if you follow steps properly.',
    date: 'Recently Claimed'
  },
  {
    id: '5',
    name: 'Matteo B.',
    country: 'Italy',
    flag: '🇮🇹',
    value: '$50',
    rewardBrand: 'PayPal',
    text: 'Process was straightforward. Got my $50 PayPal reward after a bit of patience.',
    date: 'Verified Recently'
  },
  {
    id: '6',
    name: 'Sarah J.',
    country: 'Australia',
    flag: '🇦🇺',
    value: '$25',
    rewardBrand: 'Roblox',
    text: 'Verified my session and claimed a $25 Roblox card for my brother.',
    date: 'Claimed Today'
  },
  {
    id: '7',
    name: 'Chloe D.',
    country: 'France',
    flag: '🇫🇷',
    value: '$10',
    rewardBrand: 'Netflix',
    text: 'Support was helpful when I had a question about the task. Reward delivered.',
    date: 'Reward Unlocked'
  },
  {
    id: '8',
    name: 'Yassine K.',
    country: 'Morocco',
    flag: '🇲🇦',
    value: '$10',
    rewardBrand: 'McDonald\'s',
    text: 'Happy with the outcome. Secured a $10 McDonald\'s code today.',
    date: 'Success Verified'
  },
  {
    id: '9',
    name: 'James W.',
    country: 'USA',
    flag: '🇺🇸',
    value: '$100',
    rewardBrand: 'Amazon',
    text: 'Verified everything and the $100 code was released. Very professional site.',
    date: 'Verified User'
  },
  {
    id: '10',
    name: 'Emma S.',
    country: 'UK',
    flag: '🇬🇧',
    value: '$25',
    rewardBrand: 'Xbox',
    text: 'Took about 10 minutes to finish the verification. Code worked perfectly.',
    date: 'Reward Received'
  },
  {
    id: '11',
    name: 'Oliver T.',
    country: 'Australia',
    flag: '🇦🇺',
    value: '$50',
    rewardBrand: 'PlayStation',
    text: 'Legit platform for gamers. Just redeemed my PSN card.',
    date: 'Successful Claim'
  },
  {
    id: '12',
    name: 'Sofia L.',
    country: 'Italy',
    flag: '🇮🇹',
    value: '$15',
    rewardBrand: 'Spotify',
    text: 'Simple instructions. No issues with the reward delivery.',
    date: 'Recently Claimed'
  },
  {
    id: '13',
    name: 'Benjamin H.',
    country: 'New Zealand',
    flag: '🇳🇿',
    value: '$25',
    rewardBrand: 'Uber',
    text: 'Used the reward for my ride today. Thanks GameFlashX!',
    date: 'Verified Recently'
  },
  {
    id: '14',
    name: 'Charlotte B.',
    country: 'Canada',
    flag: '🇨🇦',
    value: '$10',
    rewardBrand: 'Apple',
    text: 'Quick and easy. Got my iTunes credit without any hassle.',
    date: 'Claimed Today'
  },
  {
    id: '15',
    name: 'Thomas M.',
    country: 'France',
    flag: '🇫🇷',
    value: '$50',
    rewardBrand: 'Steam',
    text: 'Very satisfied. The task was easy and the code is working.',
    date: 'Reward Unlocked'
  },
  {
    id: '16',
    name: 'Hassan A.',
    country: 'Morocco',
    flag: '🇲🇦',
    value: '$25',
    rewardBrand: 'Free Fire',
    text: 'Good experience. The verification was fast.',
    date: 'Success Verified'
  },
  {
    id: '17',
    name: 'Isabella V.',
    country: 'Germany',
    flag: '🇩🇪',
    value: '$10',
    rewardBrand: 'Nintendo',
    text: 'Simple and effective. Got a $10 eShop card.',
    date: 'Verified User'
  },
  {
    id: '18',
    name: 'Daniel P.',
    country: 'USA',
    flag: '🇺🇸',
    value: '$25',
    rewardBrand: 'DoorDash',
    text: 'Dinner is on GameFlashX today! Reward arrived instantly.',
    date: 'Reward Received'
  },
  {
    id: '19',
    name: 'Mia Z.',
    country: 'UK',
    flag: '🇬🇧',
    value: '$50',
    rewardBrand: 'Visa',
    text: 'Verified my account and got the prepaid card details quickly.',
    date: 'Successful Claim'
  },
  {
    id: '20',
    name: 'Luca F.',
    country: 'Italy',
    flag: '🇮🇹',
    value: '$10',
    rewardBrand: 'Amazon',
    text: 'Perfetto! Tutto è andato bene con il premio.',
    date: 'Recently Claimed'
  }
];
