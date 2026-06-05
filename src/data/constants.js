export const ALL_SKILLS = [
  'Python', 'JavaScript', 'React', 'UI/UX Design', 'Graphic Design',
  'Photography', 'Video Editing', 'Spanish', 'French', 'Japanese',
  'Guitar', 'Piano', 'Violin', 'Singing', 'Drawing', 'Painting',
  'Chess', 'Public Speaking', 'Writing', 'Data Science', 'Machine Learning',
  '3D Modeling', 'Yoga', 'Cooking', 'Baking', 'Digital Marketing',
  'SEO', 'Content Writing', 'Blockchain',
];

export const ALL_INTERESTS = [
  'Technology', 'Music', 'Arts & Craft', 'Languages', 'Sports',
  'Science', 'Business', 'Gaming', 'Travel', 'Food',
  'Health & Fitness', 'Finance', 'Philosophy', 'History',
];

export const TIERS = [
  { id: 'E',   label: 'E',   full: 'Beginner',   color: '#9ca3af', glow: 'rgba(156,163,175,0.3)', desc: 'Just starting out' },
  { id: 'D',   label: 'D',   full: 'Novice',      color: '#6ee7b7', glow: 'rgba(110,231,183,0.3)', desc: 'Learning basics' },
  { id: 'C',   label: 'C',   full: 'Adept',       color: '#60a5fa', glow: 'rgba(96,165,250,0.3)',  desc: 'Getting skilled' },
  { id: 'B',   label: 'B',   full: 'Skilled',     color: '#a78bfa', glow: 'rgba(167,139,250,0.3)', desc: 'Strong foundation' },
  { id: 'A',   label: 'A',   full: 'Expert',      color: '#f59e0b', glow: 'rgba(245,158,11,0.3)',  desc: 'Near mastery' },
  { id: 'S',   label: 'S',   full: 'Master',      color: '#f97316', glow: 'rgba(249,115,22,0.3)',  desc: 'Community master' },
  { id: 'S+',  label: 'S+',  full: 'Elite',       color: '#ec4899', glow: 'rgba(236,72,153,0.3)',  desc: 'Elite tier' },
  { id: 'S++', label: 'S++', full: 'Legendary',   color: '#fbbf24', glow: 'rgba(251,191,36,0.5)',  desc: 'Absolute legend' },
];

export const TIER_COLORS = {
  E: '#9ca3af', D: '#6ee7b7', C: '#60a5fa', B: '#a78bfa',
  A: '#f59e0b', S: '#f97316', 'S+': '#ec4899', 'S++': '#fbbf24',
};

export const SKILL_CATEGORIES = [
  'All', 'Technology', 'Music', 'Languages', 'Arts', 'Sports', 'Business', 'Wellness',
];

export const MOCK_USERS = [
  {
    id: 1, name: 'Aisha Patel', age: 24,
    skills: ['Python', 'Machine Learning'],
    wantToLearn: ['Guitar', 'Spanish'],
    tier: 'A', interests: ['Tech', 'Music'],
    verified: true, avatar: '👩‍💻', rating: 4.9, exchanges: 23,
    bio: "ML engineer by day, aspiring musician by night. Let's swap skills!",
  },
  {
    id: 2, name: 'Marco Rivera', age: 27,
    skills: ['Guitar', 'Spanish'],
    wantToLearn: ['React', 'Python'],
    tier: 'S', interests: ['Music', 'Languages'],
    verified: true, avatar: '🎸', rating: 4.8, exchanges: 41,
    bio: 'Professional guitarist & native Spanish speaker. Teach me tech!',
  },
  {
    id: 3, name: 'Yuki Tanaka', age: 22,
    skills: ['Japanese', 'Drawing'],
    wantToLearn: ['Data Science', 'Chess'],
    tier: 'B', interests: ['Arts', 'Languages'],
    verified: false, avatar: '🎨', rating: 4.6, exchanges: 12,
    bio: 'Artist and language enthusiast. Dreams of learning data science.',
  },
  {
    id: 4, name: 'Raj Sharma', age: 29,
    skills: ['React', 'UI/UX Design'],
    wantToLearn: ['Finance', 'Piano'],
    tier: 'S+', interests: ['Tech', 'Music'],
    verified: true, avatar: '💻', rating: 5.0, exchanges: 67,
    bio: 'Senior developer building beautiful products. Want to learn investing!',
  },
  {
    id: 5, name: 'Sofia Müller', age: 25,
    skills: ['Finance', 'Public Speaking'],
    wantToLearn: ['Drawing', 'Photography'],
    tier: 'A', interests: ['Business', 'Arts'],
    verified: true, avatar: '📊', rating: 4.7, exchanges: 34,
    bio: 'Finance analyst who wants to explore the creative side.',
  },
  {
    id: 6, name: 'Chen Wei', age: 31,
    skills: ['3D Modeling', 'Video Editing'],
    wantToLearn: ['Spanish', 'Yoga'],
    tier: 'S', interests: ['Arts', 'Tech'],
    verified: true, avatar: '🎬', rating: 4.9, exchanges: 52,
    bio: 'Motion designer with 7 years of experience. Looking to relax with yoga.',
  },
  {
    id: 7, name: 'Priya Nair', age: 23,
    skills: ['Yoga', 'Cooking'],
    wantToLearn: ['Python', 'Content Writing'],
    tier: 'C', interests: ['Health', 'Food'],
    verified: false, avatar: '🧘', rating: 4.4, exchanges: 8,
    bio: "Wellness coach and foodie. Ready to enter the tech world!",
  },
  {
    id: 8, name: 'Alex Johnson', age: 26,
    skills: ['Chess', 'Data Science'],
    wantToLearn: ['Guitar', 'French'],
    tier: 'A', interests: ['Gaming', 'Tech'],
    verified: true, avatar: '♟', rating: 4.8, exchanges: 29,
    bio: 'Chess master & data scientist. Wants to add music to the mix.',
  },
];

export const MOCK_MESSAGES = {
  1: [
    { from: 'them', text: 'Hey! I saw you want to learn Guitar. I can teach you!', time: '10:32 AM' },
    { from: 'me',   text: "That's great! I can teach you Python in exchange. When are you free?", time: '10:35 AM' },
    { from: 'them', text: 'Weekends work best for me. Saturday evenings?', time: '10:38 AM' },
    { from: 'me',   text: "Perfect! Let's start this Saturday at 6 PM.", time: '10:40 AM' },
    { from: 'them', text: 'Confirmed! 🎸 Looking forward to it!', time: '10:41 AM' },
  ],
  2: [
    { from: 'them', text: 'Hola! I noticed you want to learn Spanish.', time: 'Yesterday' },
    { from: 'me',   text: "¡Hola! Yes, I'd love to learn. Can you help?", time: 'Yesterday' },
    { from: 'them', text: 'Sure! And I need React skills. Exchange?', time: 'Yesterday' },
  ],
};

export const AUTO_REPLIES = [
  'That sounds great! 😊',
  'Looking forward to our exchange!',
  'When can we start?',
  'That works for me!',
  'Great idea! Let\'s do it 🚀',
];
