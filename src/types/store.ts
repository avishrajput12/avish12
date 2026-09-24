export type CurrencyCode = 'USD' | 'JPY' | 'EUR' | 'GBP' | 'CNY' | 'MXN';

export type LanguageCode = 'en' | 'ja' | 'zh' | 'es';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromUSD: number; // e.g. 1 USD = 152 JPY
  freeShippingThreshold: number;
  format: (amountInUSD: number) => string;
}

export interface RegionConfig {
  id: string;
  name: string;
  country: string;
  flag: string;
  defaultCurrency: CurrencyCode;
  defaultLanguage: LanguageCode;
  shippingCarrier: string;
  estimatedDelivery: string;
  customsPolicy: string;
}

export interface Product {
  id: string;
  name: string;
  localizedNames?: Partial<Record<LanguageCode, string>>;
  category: 'apparel' | 'drinkware' | 'bags' | 'campus' | 'new';
  subcategory: string;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isEcoFriendly?: boolean;
  stockLeft: number;
  liveViewersCount: number;
  shortDesc: string;
  localizedDesc?: Partial<Record<LanguageCode, string>>;
  features: string[];
  sizes?: string[];
  colors: { name: string; hex: string }[];
  bounceRateNote?: string; // e.g. "From 11.8% Bounce Rate Category"
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type TrafficSource = 'direct' | 'google_cpc' | 'tokyo_geo' | 'chinese_lang' | 'spanish_lang' | 'organic';

export interface GA4OptimizationPillar {
  id: 1 | 2 | 3 | 4;
  title: string;
  shortLabel: string;
  dataProblem: string;
  metricBadge: string;
  implementedFixes: string[];
  expectedImpact: string;
}
