import { WeatherData, FloodData, Basin } from '@/lib/types';

interface BasinParametersProps {
  basin: Basin;
  weather: WeatherData | null;
  flood: FloodData | null;
  population: number;
  loading: boolean;
}

export function BasinParameters({ basin, weather, flood, population, loading }: BasinParametersProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">▸ HAVZA PARAMETRELERİ</div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-secondary rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const params = [
    { label: 'Havza', value: basin.nameTr },
    { label: 'Ülkeler', value: basin.countries.join(', ') },
    { label: 'Nehirler', value: basin.rivers.join(', ') },
    { label: 'Sıcaklık', value: `${weather?.temperature?.toFixed(1) ?? '--'}°C` },
    { label: 'Toprak Nemi', value: `${((weather?.soilMoisture ?? 0) * 100).toFixed(1)}%` },
    { label: 'Yağış', value: `${weather?.precipitation?.toFixed(1) ?? '--'} mm` },
    { label: 'Nehir Debisi', value: `${flood?.discharge?.toFixed(1) ?? '--'} m³/s` },
    { label: 'Nüfus (TR)', value: `${(population / 1_000_000).toFixed(1)} milyon` },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">▸ HAVZA PARAMETRELERİ</div>
      <div className="space-y-1.5">
        {params.map((p) => (
          <div key={p.label} className="flex justify-between items-center text-xs font-mono">
            <span className="text-muted-foreground">{p.label}</span>
            <span className="text-foreground">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
