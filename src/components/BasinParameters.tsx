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
  'Ülkeler': 'Havzanın topraklarında yer aldığı kıyidaş devletler. Su kaynaklarının ortak kullanımı nedeniyle hidropolitik anlaşmazlık potansiyeli taşırlar.',
  'Nehirler': 'Havzanın ana akar su sistemleri. Debileri, mevsimsel değişimler ve mansap-memba ilişkileri operasyonel risk hesaplamasında kullanılır.',
  'Sıcaklık': 'Open-Meteo API üzerinden alınan anlık hava sıcaklığı (2 m irtifa, °C). vClim ve RSI hesaplamasına girdi olarak kullanılır.',
  'Toprak Nemi': 'Open-Meteo üzerinden alınan 0-7cm derinlik toprak nemi (m³/m³). Sulama ihtiyacı, kuraklık ve tarımsal krizlerin göstergesidir.',
  'Yağış': 'Anlık yağış miktarı (mm). Düşük değerler kuraklığı, yüksek değerler taşkın riskini gösterir.',
  'Nehir Debisi': 'Open-Meteo Flood API üzerinden alınan anlık akar su debisi (m³/s). Uzun dönem ortalamanın üzerinde değerler taşkın uyarısı oluşturur.',
  'Nüfus (TR)': 'Türkiye nüfusu (Dünya Bankası, 2022). RSI hesaplamasında (nüfus/1.000.000) × 0.15 ağırlığıyla su talebi bileşeni olarak kullanılır.',
};

export function BasinParameters({ basin, weather, flood, population, loading }: BasinParametersProps) {
  const params = [
    { label: 'Havza', value: basin.name },
    { label: 'Ülkeler', value: basin.countries.join(', ') },
    { label: 'Nehirler', value: basin.rivers.join(', ') },
    { label: 'Sıcaklık', value: weather ? `${weather.temperature}°C` : '--' },
    { label: 'Toprak Nemi', value: weather ? `${(weather.soilMoisture * 100).toFixed(1)}%` : '--' },
    { label: 'Yağış', value: weather ? `${weather.precipitation} mm` : '--' },
    { label: 'Nehir Debisi', value: flood ? `${flood.discharge.toFixed(1)} m³/s` : '--' },
    { label: 'Nüfus (TR)', value: `${(population / 1_000_000).toFixed(1)}M` },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        ▸ HAVZA PARAMETRELERİ
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[280px] text-xs">
            Seçili havzaya ait coğrafi, hidrolojik ve iklimsel parametreler. Veriler Open-Meteo, Dünya Bankası ve NASA FIRMS API’lerinden gerçek zamanlı çekilir.
          </TooltipContent>
        </Tooltip>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 bg-secondary/30 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1.5">
          {params.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                <span>{label}</span>
                {PARAM_TOOLTIPS[label] && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[260px] text-xs">
                      {PARAM_TOOLTIPS[label]}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <span className="text-foreground text-right">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
