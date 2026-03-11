import { WeatherData, ThermalAnomaly } from '@/lib/types';
import { Droplets, Thermometer, Flame, Wind } from 'lucide-react';

interface MetricCardsProps {
  weather: WeatherData | null;
  thermal: ThermalAnomaly | null;
  population: number;
  loading: boolean;
}

export function MetricCards({ weather, thermal, population, loading }: MetricCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-3 animate-pulse h-20" />
        ))}
      </div>
    );
  }

  const metrics = [
    {
      icon: Thermometer,
      label: 'Sıcaklık',
      value: `${weather?.temperature?.toFixed(1) ?? '--'}°C`,
      sub: 'Anlık',
    },
    {
      icon: Droplets,
      label: 'Toprak Nemi',
      value: `${((weather?.soilMoisture ?? 0) * 100).toFixed(1)}%`,
      sub: '0-7cm',
    },
    {
      icon: Wind,
      label: 'Rüzgar',
      value: `${weather?.windSpeed?.toFixed(1) ?? '--'} km/s`,
      sub: 'Anlık',
    },
    {
      icon: Flame,
      label: 'Termal Anomali',
      value: `${thermal?.count ?? 0}`,
      sub: thermal?.status ?? 'NORMAL',
      alert: thermal?.status === 'KRİTİK',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {metrics.map((m) => (
        <div
          key={m.label}
          className={`rounded-lg border bg-card p-3 ${m.alert ? 'border-critical' : 'border-border'}`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <m.icon className={`h-3.5 w-3.5 ${m.alert ? 'text-critical' : 'text-primary'}`} />
            <span className="text-[10px] text-muted-foreground font-mono">{m.label}</span>
          </div>
          <div className="text-lg font-bold font-mono text-foreground">{m.value}</div>
          <div className={`text-[10px] font-mono ${m.alert ? 'text-critical' : 'text-muted-foreground'}`}>
            {m.sub}
          </div>
        </div>
      ))}
      <div className="col-span-2 rounded-lg border border-border bg-card p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-mono">Nüfus (TR)</span>
          <span className="text-sm font-mono text-foreground">
            {(population / 1_000_000).toFixed(1)}M
          </span>
        </div>
      </div>
    </div>
  );
}
