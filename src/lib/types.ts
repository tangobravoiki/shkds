export interface Basin {
  id: string;
  name: string;
  nameTr: string;
  lat: number;
  lng: number;
  zoom: number;
  countries: string[];
  rivers: string[];
  worldBankCountryCode: string;
  openMeteoLat: number;
  openMeteoLng: number;
  floodLat: number;
  floodLng: number;
  rssKeywords: string[];
  dsiLinks: { title: string; url: string }[];
  synthesis: string;
}

export interface WeatherData {
  temperature: number;
  soilMoisture: number;
  precipitation: number;
  windSpeed: number;
}

export interface FloodData {
  discharge: number;
  dates: string[];
  values: number[];
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
}

export interface WorldBankData {
  population: number;
  gdpPerCapita: number;
  waterWithdrawal: number;
}

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface ThermalAnomaly {
  count: number;
  status: 'NORMAL' | 'UYARI' | 'KRİTİK';
}

export interface BLRParams {
  government: number;
  energy: number;
  population: number;
  foodWater: number;
  health: number;
  communication: number;
  transportation: number;
}

export interface RiskResult {
  vNato: number;
  rsi: number;
  vClim: number;
  blrVulnerability: number;
  operationalRisk: number;
  status: 'NORMAL' | 'UYARI' | 'KRİTİK';
  thermalPenalty: number;
  newsPenalty: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
