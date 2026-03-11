import { BLRParams, RiskResult, WeatherData, ThermalAnomaly } from './types';

export function calculateRSI(weather: WeatherData, population: number): number {
  const demand = (population / 1_000_000) * 0.15;
  const supply = Math.max(0.01, weather.soilMoisture * 100 + weather.precipitation * 10);
  const climFreq = weather.temperature > 35 ? 1.5 : weather.temperature > 30 ? 1.2 : 1.0;
  const rsi = Math.min(1, (demand / supply) * climFreq * 0.1);
  return parseFloat(rsi.toFixed(4));
}

export function calculateVClim(weather: WeatherData): number {
  const tRef = 25;
  const tMax = 50;
  const vClim = Math.min(1, Math.max(0, (weather.temperature - tRef) / (tMax - tRef)));
  return parseFloat(vClim.toFixed(4));
}

export function calculateBLRVulnerability(blr: BLRParams): number {
  const weights = {
    government: 0.20,
    energy: 0.15,
    population: 0.10,
    foodWater: 0.20,
    health: 0.10,
    communication: 0.10,
    transportation: 0.15,
  };
  
  const vulnerability = Object.keys(weights).reduce((sum, key) => {
    const k = key as keyof BLRParams;
    return sum + (1 - blr[k]) * weights[k];
  }, 0);
  
  return parseFloat(vulnerability.toFixed(4));
}

export function calculateRisk(
  weather: WeatherData,
  population: number,
  blr: BLRParams,
  thermal: ThermalAnomaly,
  newsCount: number
): RiskResult {
  const rsi = calculateRSI(weather, population);
  const vClim = calculateVClim(weather);
  const blrVulnerability = calculateBLRVulnerability(blr);
  
  const operationalRisk = (rsi * 0.5 + vClim * 0.5);
  
  const thermalPenalty = thermal.count > 50 ? 0.10 : thermal.count > 10 ? 0.05 : 0;
  const newsPenalty = newsCount > 5 ? 0.05 : newsCount > 2 ? 0.02 : 0;
  
  let vNato = blrVulnerability * 0.4 + operationalRisk * 0.6 + thermalPenalty + newsPenalty;
  vNato = Math.min(1, Math.max(0, vNato));
  vNato = parseFloat(vNato.toFixed(4));
  
  const status = vNato > 0.7 ? 'KRİTİK' : vNato > 0.4 ? 'UYARI' : 'NORMAL';
  
  return {
    vNato,
    rsi,
    vClim,
    blrVulnerability: parseFloat(blrVulnerability.toFixed(4)),
    operationalRisk: parseFloat(operationalRisk.toFixed(4)),
    status,
    thermalPenalty,
    newsPenalty,
  };
}
