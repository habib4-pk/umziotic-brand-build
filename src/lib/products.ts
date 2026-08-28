import bottle from "@/assets/hero-bottle.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  concerns: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "Bestseller" | "New";
  short: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
};

export const CATEGORIES = [
  "Hair Care",
  "Immunity",
  "Skin Care",
  "Detox",
  "Weight Management",
] as const;

export const CONCERNS = ["Hair Fall", "Acne", "Dull Skin", "Low Energy", "Digestion"] as const;

export const formatPKR = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;

export const products: Product[] = [
  {
    id: "herbal-hair-growth-support-formula",
    name: "Herbal Hair Growth Support Formula",
    category: "Hair Care",
    concerns: ["Hair Fall"],
    price: 2450,
    originalPrice: 3050,
    rating: 4.5,
    reviews: 120,
    image: bottle,
    badge: "Bestseller",
    short:
      "A powerful blend of 15+ herbs designed to strengthen hair roots, improve thickness and shine.",
    description:
      "Our Herbal Hair Growth Support Formula combines traditional Ayurvedic botanicals with modern extraction methods to nourish follicles from within. Regular use helps reduce hair fall, supports natural regrowth and restores scalp balance.",
    ingredients: ["Bhringraj", "Amla", "Saw Palmetto", "Biotin (plant derived)", "Fenugreek"],
    benefits: [
      "Reduces hair fall",
      "Strengthens roots",
      "Promotes natural regrowth",
      "Improves scalp health",
    ],
    howToUse: "Take 2 capsules daily after breakfast with a glass of water for at least 90 days.",
  },
  {
    id: "immunity-boost-herbal-blend",
    name: "Immunity Boost Herbal Blend",
    category: "Immunity",
    concerns: ["Low Energy"],
    price: 2150,
    rating: 4.7,
    reviews: 98,
    image: bottle,
    badge: "Bestseller",
    short: "Daily herbal defence with elderberry, tulsi and giloy to keep you resilient year round.",
    description:
      "A clinically researched blend of adaptogens and antioxidant-rich herbs that support the body's natural defence system and everyday vitality.",
    ingredients: ["Giloy", "Tulsi", "Elderberry", "Ashwagandha", "Zinc from guava leaf"],
    benefits: ["Supports natural immunity", "Fights daily fatigue", "Rich in antioxidants"],
    howToUse: "Take 1 capsule twice daily, preferably with meals.",
  },
  {
    id: "skin-radiance-herbal-formula",
    name: "Skin Radiance Herbal Formula",
    category: "Skin Care",
    concerns: ["Dull Skin", "Acne"],
    price: 2650,
    originalPrice: 3200,
    rating: 4.4,
    reviews: 76,
    image: bottle,
    short: "Clear, glowing skin powered by manjistha, neem and turmeric extracts.",
    description:
      "Formulated to purify from within, this blend targets dullness and breakouts by supporting healthy skin cell renewal and balanced oil production.",
    ingredients: ["Manjistha", "Neem", "Turmeric (95% curcumin)", "Aloe Vera", "Vitamin E"],
    benefits: ["Improves natural glow", "Helps clear breakouts", "Supports even skin tone"],
    howToUse: "Take 1 capsule daily after dinner.",
  },
  {
    id: "detox-cleanse-herbal-support",
    name: "Detox & Cleanse Herbal Support",
    category: "Detox",
    concerns: ["Digestion"],
    price: 2350,
    rating: 4.2,
    reviews: 64,
    image: bottle,
    badge: "New",
    short: "Gentle 15-herb cleanse for liver, gut and everyday digestive comfort.",
    description:
      "A gentle yet effective cleanse that supports liver function, eases bloating and restores digestive rhythm without harsh laxatives.",
    ingredients: ["Milk Thistle", "Triphala", "Dandelion Root", "Ginger", "Fennel"],
    benefits: ["Eases bloating", "Supports liver health", "Improves digestion"],
    howToUse: "Take 2 capsules before bed with warm water for 30 days.",
  },
  {
    id: "weight-management-herbal-formula",
    name: "Weight Management Herbal Formula",
    category: "Weight Management",
    concerns: ["Low Energy", "Digestion"],
    price: 2650,
    rating: 4.1,
    reviews: 52,
    image: bottle,
    short: "Metabolism support with green coffee, garcinia and cinnamon extract.",
    description:
      "Supports a healthy metabolic rate and helps curb cravings as part of a balanced diet and active routine.",
    ingredients: ["Green Coffee Bean", "Garcinia Cambogia", "Cinnamon Bark", "Green Tea"],
    benefits: ["Supports metabolism", "Helps curb cravings", "Sustained energy"],
    howToUse: "Take 1 capsule 30 minutes before lunch and dinner.",
  },
  {
    id: "sleep-support-herbal-blend",
    name: "Sleep Support Herbal Blend",
    category: "Immunity",
    concerns: ["Low Energy"],
    price: 2150,
    rating: 4.6,
    reviews: 88,
    image: bottle,
    short: "Calming ashwagandha and chamomile blend for deeper, uninterrupted rest.",
    description:
      "A non-habit forming herbal blend that calms the nervous system and helps you fall asleep faster and wake refreshed.",
    ingredients: ["Ashwagandha", "Chamomile", "Brahmi", "Valerian Root"],
    benefits: ["Faster sleep onset", "Deeper rest", "Calms stress"],
    howToUse: "Take 1 capsule 45 minutes before bedtime.",
  },
  {
    id: "scalp-nourish-herbal-oil-caps",
    name: "Scalp Nourish Herbal Capsules",
    category: "Hair Care",
    concerns: ["Hair Fall"],
    price: 1950,
    originalPrice: 2450,
    rating: 4.3,
    reviews: 41,
    image: bottle,
    short: "Cold-pressed botanicals that calm an irritated, flaky scalp.",
    description:
      "Targets the root cause of flaking and itchiness with soothing herbal actives and essential fatty acids.",
    ingredients: ["Rosemary", "Neem", "Black Seed Oil", "Sesame Oil"],
    benefits: ["Soothes scalp", "Reduces flaking", "Adds natural shine"],
    howToUse: "Take 1 capsule daily with breakfast.",
  },
  {
    id: "daily-greens-herbal-powder",
    name: "Daily Greens Herbal Powder",
    category: "Detox",
    concerns: ["Low Energy", "Digestion"],
    price: 3150,
    rating: 4.8,
    reviews: 133,
    image: bottle,
    badge: "Bestseller",
    short: "24 wholefood greens in one scoop for daily nourishment.",
    description:
      "A wholefood greens powder with wheatgrass, moringa and spirulina to fill everyday nutritional gaps.",
    ingredients: ["Moringa", "Wheatgrass", "Spirulina", "Barley Grass", "Mint"],
    benefits: ["Daily micronutrients", "Alkalising support", "Clean energy"],
    howToUse: "Mix one scoop in 250ml water or juice each morning.",
  },
  {
    id: "joint-mobility-herbal-support",
    name: "Joint & Mobility Herbal Support",
    category: "Immunity",
    concerns: ["Low Energy"],
    price: 2850,
    rating: 4.0,
    reviews: 37,
    image: bottle,
    short: "Boswellia and curcumin blend for comfortable, flexible movement.",
    description:
      "Traditional anti-inflammatory herbs standardised for potency to support joint comfort and mobility.",
    ingredients: ["Boswellia Serrata", "Curcumin", "Ginger", "Shallaki"],
    benefits: ["Eases stiffness", "Supports mobility", "Comfort in daily movement"],
    howToUse: "Take 1 capsule twice daily after meals.",
  },
  {
    id: "glow-collagen-herbal-boost",
    name: "Glow Collagen Herbal Boost",
    category: "Skin Care",
    concerns: ["Dull Skin"],
    price: 3450,
    originalPrice: 4100,
    rating: 4.5,
    reviews: 59,
    image: bottle,
    badge: "New",
    short: "Plant-based collagen builders for firmer, hydrated skin.",
    description:
      "Supports the body's own collagen production with vitamin C rich amla, bamboo silica and hyaluronic-boosting botanicals.",
    ingredients: ["Amla", "Bamboo Silica", "Gotu Kola", "Rosehip"],
    benefits: ["Supports firmness", "Boosts hydration", "Softens fine lines"],
    howToUse: "Take 2 capsules daily with water.",
  },
  {
    id: "gut-balance-probiotic-herbs",
    name: "Gut Balance Herbal Probiotic",
    category: "Detox",
    concerns: ["Digestion"],
    price: 2750,
    rating: 4.4,
    reviews: 71,
    image: bottle,
    short: "Herbal prebiotics paired with 10 billion live cultures.",
    description:
      "Rebuilds a healthy microbiome with herbal prebiotic fibres and shelf-stable live cultures.",
    ingredients: ["Inulin", "Triphala", "Lactobacillus blend", "Fennel"],
    benefits: ["Balances gut flora", "Reduces bloating", "Regularity support"],
    howToUse: "Take 1 capsule daily on an empty stomach.",
  },
  {
    id: "energy-vitality-herbal-tonic",
    name: "Energy & Vitality Herbal Tonic",
    category: "Weight Management",
    concerns: ["Low Energy"],
    price: 2250,
    rating: 4.2,
    reviews: 44,
    image: bottle,
    short: "Adaptogenic tonic for steady, caffeine-free energy.",
    description:
      "Shilajit and ginseng work with B-vitamin rich botanicals to keep energy steady through long days.",
    ingredients: ["Shilajit", "Korean Ginseng", "Ashwagandha", "Moringa"],
    benefits: ["Steady energy", "Reduces fatigue", "Supports stamina"],
    howToUse: "Take 1 capsule each morning.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categoryCounts = CATEGORIES.map((c) => ({
  name: c,
  count: products.filter((p) => p.category === c).length,
}));
