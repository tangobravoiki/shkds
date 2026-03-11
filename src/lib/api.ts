import { WeatherData, FloodData, ForecastDay, NewsItem, ThermalAnomaly } from './types';

const CORS_PROXIES = [
  '',
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
];

async function fetchWithProxy(url: string): Promise<Response> {
  for (const proxy of CORS_PROXIES) {
    try {
      const targetUrl = proxy ? `${proxy}${encodeURIComponent(url)}` : url;
      const res = await fetch(targetUrl, { signal: AbortSignal.timeout(8000) });
      if (res.ok) return res;
    } catch {
      continue;
    }
  }
  throw new Error(`All proxies failed for: ${url}`);
}

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,precipitation,wind_speed_10m,soil_moisture_0_to_7cm`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    temperature: data.current?.temperature_2m ?? 0,
    soilMoisture: data.current?.soil_moisture_0_to_7cm ?? 0,
    precipitation: data.current?.precipitation ?? 0,
    windSpeed: data.current?.wind_speed_10m ?? 0,
  };
}

export async function fetchForecast(lat: number, lng: number): Promise<ForecastDay[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto`;
  const res = await fetch(url);
  const data = await res.json();
  const days: ForecastDay[] = [];
  if (data.daily) {
    for (let i = 0; i < data.daily.time.length; i++) {
      days.push({
        date: data.daily.time[i],
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        precipitation: data.daily.precipitation_sum[i],
      });
    }
  }
  return days;
}

export async function fetchFloodData(lat: number, lng: number): Promise<FloodData> {
  const url = `https://flood-api.open-meteo.com/v1/flood?latitude=${lat}&longitude=${lng}&daily=river_discharge&forecast_days=7`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.daily) {
      const values = data.daily.river_discharge || [];
      return {
        discharge: values[0] ?? 0,
        dates: data.daily.time || [],
        values,
      };
    }
  } catch {
    // Flood API may not have data for all coords
  }
  return { discharge: 0, dates: [], values: [] };
}

export async function fetchPopulation(countryCode: string): Promise<number> {
  try {
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json&date=2022&per_page=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data[1]?.[0]?.value ?? 85_000_000;
  } catch {
    return 85_000_000;
  }
}

export async function fetchNews(keywords: string[]): Promise<NewsItem[]> {
  const allNews: NewsItem[] = [];
  const feeds = [
    `https://news.google.com/rss/search?q=${encodeURIComponent(keywords.join(' OR '))}&hl=tr&gl=TR&ceid=TR:tr`,
    `https://reliefweb.int/updates/rss.xml`,
  ];
  
  for (const feed of feeds) {
    try {
      const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`;
      const res = await fetch(rssUrl, { signal: AbortSignal.timeout(6000) });
      const data = await res.json();
      if (data.items) {
        const items = data.items.slice(0, 5).map((item: any) => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          source: item.author || data.feed?.title || 'Bilinmeyen',
        }));
        allNews.push(...items);
      }
    } catch {
      continue;
    }
  }
  return allNews.slice(0, 8);
}

export async function fetchThermalAnomalies(lat: number, lng: number): Promise<ThermalAnomaly> {
  try {
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/VIIRS_SNPP_NRT/${lat - 2},${lng - 2},${lat + 2},${lng + 2}/1`;
    const res = await fetchWithProxy(url);
    const text = await res.text();
    const lines = text.trim().split('\n');
    const count = Math.max(0, lines.length - 1);
    return {
      count,
      status: count > 50 ? 'KRİTİK' : count > 10 ? 'UYARI' : 'NORMAL',
    };
  } catch {
    return { count: 0, status: 'NORMAL' };
  }
}
