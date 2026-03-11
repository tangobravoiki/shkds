import { Basin, RiskResult, WeatherData, BLRParams, ForecastDay } from './types';

export function generateJSONReport(
  basin: Basin,
  risk: RiskResult,
  weather: WeatherData,
  blr: BLRParams,
  forecast: ForecastDay[]
) {
  const report = {
    meta: {
      system: 'Sınıraşan Havzalar KDS v4.2',
      timestamp: new Date().toISOString(),
      basin: basin.nameTr,
    },
    risk,
    weather,
    blrParameters: blr,
    forecast,
  };
  
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `KDS_${basin.id}_${Date.now()}.json`);
}

export function generateTXTReport(
  basin: Basin,
  risk: RiskResult,
  weather: WeatherData,
  blr: BLRParams
) {
  const lines = [
    '═══════════════════════════════════════════════',
    '  SINIRAŞAN HAVZALAR KDS v4.2 — RAPOR',
    '═══════════════════════════════════════════════',
    '',
    `Havza: ${basin.nameTr}`,
    `Tarih: ${new Date().toLocaleString('tr-TR')}`,
    `Ülkeler: ${basin.countries.join(', ')}`,
    '',
    '── RİSK ANALİZİ ──────────────────────────────',
    `vNato (Bütünleşik Risk): ${risk.vNato}`,
    `Durum: ${risk.status}`,
    `RSI (Su Stresi): ${risk.rsi}`,
    `vClim (İklim Riski): ${risk.vClim}`,
    `BLR Zafiyet: ${risk.blrVulnerability}`,
    `Operasyonel Risk: ${risk.operationalRisk}`,
    '',
    '── HAVA DURUMU ────────────────────────────────',
    `Sıcaklık: ${weather.temperature}°C`,
    `Toprak Nemi: ${weather.soilMoisture} m³/m³`,
    `Yağış: ${weather.precipitation} mm`,
    `Rüzgar: ${weather.windSpeed} km/s`,
    '',
    '── NATO 7BLR PARAMETRELERİ ────────────────────',
    `Hükümet: ${blr.government.toFixed(2)}`,
    `Enerji: ${blr.energy.toFixed(2)}`,
    `Nüfus: ${blr.population.toFixed(2)}`,
    `Gıda/Su: ${blr.foodWater.toFixed(2)}`,
    `Sağlık: ${blr.health.toFixed(2)}`,
    `İletişim: ${blr.communication.toFixed(2)}`,
    `Ulaşım: ${blr.transportation.toFixed(2)}`,
    '',
    '═══════════════════════════════════════════════',
  ];
  
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `KDS_${basin.id}_${Date.now()}.txt`);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
