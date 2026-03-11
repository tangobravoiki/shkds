import { useState, useEffect, useCallback } from 'react';
import { BASINS, DEFAULT_BLR } from '@/lib/basins';
import { Basin, BLRParams, WeatherData, FloodData, ForecastDay, NewsItem, ThermalAnomaly, RiskResult } from '@/lib/types';
import { fetchWeather, fetchForecast, fetchFloodData, fetchPopulation, fetchNews, fetchThermalAnomalies } from '@/lib/api';
import { calculateRisk } from '@/lib/risk-engine';
import { generateJSONReport, generateTXTReport } from '@/lib/report';
import { Header } from '@/components/Header';
import { RiskGauge } from '@/components/RiskGauge';
import { MetricCards } from '@/components/MetricCards';
import { BasinMap } from '@/components/BasinMap';
import { BasinParameters } from '@/components/BasinParameters';
import { NewsFeed } from '@/components/NewsFeed';
import { ForecastChart } from '@/components/ForecastChart';
import { SimulationPanel } from '@/components/SimulationPanel';
import { DSILinks } from '@/components/DSILinks';
import { Synthesis } from '@/components/Synthesis';

const Index = () => {
  const [selectedBasin, setSelectedBasin] = useState<Basin>(BASINS[0]);
  const [blr, setBLR] = useState<BLRParams>({ ...DEFAULT_BLR });
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [flood, setFlood] = useState<FloodData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [population, setPopulation] = useState(85_000_000);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [thermal, setThermal] = useState<ThermalAnomaly | null>(null);
  const [risk, setRisk] = useState<RiskResult | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBasinChange = useCallback((id: string) => {
    const basin = BASINS.find((b) => b.id === id);
    if (basin) setSelectedBasin(basin);
  }, []);

  // Fetch all data when basin changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const loadData = async () => {
      const [w, fc, fl, pop, n, th] = await Promise.allSettled([
        fetchWeather(selectedBasin.openMeteoLat, selectedBasin.openMeteoLng),
        fetchForecast(selectedBasin.openMeteoLat, selectedBasin.openMeteoLng),
        fetchFloodData(selectedBasin.floodLat, selectedBasin.floodLng),
        fetchPopulation(selectedBasin.worldBankCountryCode),
        fetchNews(selectedBasin.rssKeywords),
        fetchThermalAnomalies(selectedBasin.openMeteoLat, selectedBasin.openMeteoLng),
      ]);

      if (cancelled) return;

      const weatherData = w.status === 'fulfilled' ? w.value : null;
      const forecastData = fc.status === 'fulfilled' ? fc.value : [];
      const floodData = fl.status === 'fulfilled' ? fl.value : null;
      const popData = pop.status === 'fulfilled' ? pop.value : 85_000_000;
      const newsData = n.status === 'fulfilled' ? n.value : [];
      const thermalData = th.status === 'fulfilled' ? th.value : { count: 0, status: 'NORMAL' as const };

      setWeather(weatherData);
      setForecast(forecastData);
      setFlood(floodData);
      setPopulation(popData);
      setNews(newsData);
      setThermal(thermalData);
      setLoading(false);
    };

    loadData();
    return () => { cancelled = true; };
  }, [selectedBasin]);

  // Recalculate risk when inputs change
  useEffect(() => {
    if (!weather || !thermal) return;
    const result = calculateRisk(weather, population, blr, thermal, news.length);
    setRisk(result);
  }, [weather, population, blr, thermal, news]);

  const handleExportJSON = () => {
    if (!risk || !weather) return;
    generateJSONReport(selectedBasin, risk, weather, blr, forecast);
  };

  const handleExportTXT = () => {
    if (!risk || !weather) return;
    generateTXTReport(selectedBasin, risk, weather, blr);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        selectedBasin={selectedBasin}
        onBasinChange={handleBasinChange}
        onExportJSON={handleExportJSON}
        onExportTXT={handleExportTXT}
      />

      <div className="flex-1 p-3 grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Panel */}
        <div className="lg:col-span-4 space-y-3">
          <RiskGauge risk={risk} loading={loading} />
          <MetricCards weather={weather} thermal={thermal} population={population} loading={loading} />
          <BasinMap selectedBasin={selectedBasin} onBasinSelect={handleBasinChange} />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-8 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BasinParameters basin={selectedBasin} weather={weather} flood={flood} population={population} loading={loading} />
            <NewsFeed news={news} loading={loading} />
          </div>
          <ForecastChart forecast={forecast} loading={loading} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SimulationPanel blr={blr} onChange={setBLR} />
            <DSILinks basin={selectedBasin} />
          </div>
        </div>
      </div>

      <Synthesis basin={selectedBasin} />
    </div>
  );
};

export default Index;
