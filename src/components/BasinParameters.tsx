import { WeatherData, FloodData, Basin } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface BasinParametersProps {
  basin: Basin;
  weather: WeatherData | null;
  flood: FloodData | null;
  population: number;
  loading: boolean;
}

const PARAM_TOOLTIPS: Record<string, string> = {
  'Havza': 'Seçili sınıraşan su havzasının tam adı. Sınıraşan havzalar, iki veya daha fazla ülkenin toprağından geçen nehirleri içeren su havzalarıdır.',
  'Ülkeler': 'Havzanın topraklarında yer aldığı kiyıdaş devletler. Su kaynaklarının ortak kullanımı nedeniyle hidropolitik anlaşmazlık potansiyeli taşırlar.',
  'Nehirler': 'Havzanın ana akar su sistemleri. Debileri, mevsimsel değişimleri ve mansap-memba ilişkileri operasyonel risk hesaplamasında kullanılır.',
  'Sıcaklık': 'Open-Meteo API üzerinden alınan anlık hava sıcaklığı (2 m irtifa, °C). vClim ve RSI hesaplamasında girdi olarak kullanılır.',
  'Toprak Nemi': 'Open-Meteo üzerinden alınan 0-7cm derinlik toprak nemi (m³/m³). Sulama ihtiyacı, kuraklık ve tarımsal krizlerin göstergesidir.',
  'Yağış': 'Anlık yağış miktarı (mm). Düşük değerler kuraklığı, yüksek değerler taşkın riskini gösterir. Ortalama yıllık değerle karşılaştırılarak yorumlanmalıdır.',
  'Nehir Debisi': 'Open-Meteo Flood API üzerinden alınan anlık akar su debisi (m³/s). Uzun dönem ortalamanın üzerinde değerler taşkın uyarısı oluşturur.',
  'Nüfus (TR)': 'Türkiye nüfusu (Dünya Bankası, 2022). RSI hesaplamasında (nüfus/1.000.000) × 0.15 ağırlığıyla su talebi bileşeni olarak kullanılır.',
};

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
      <div className="space-y-1">
        {params.map((p) => (
          <div key={p.label} className="flex justify-between items-center py-1 border-b border-border/30 last:border-0">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground font-mono">{p.label}</span>
              {PARAM_TOOLTIPS[p.label] && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-2.5 w-2.5 cursor-help opacity-40 hover:opacity-100 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[240px] text-xs">
                    {PARAM_TOOLTIPS[p.label]}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <span className="text-[10px] font-mono text-foreground text-right max-w-[55%]">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
