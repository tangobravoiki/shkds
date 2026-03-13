import { WeatherData, ThermalAnomaly } from '@/lib/types';
import { Droplets, Thermometer, Flame, Wind, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface MetricCardsProps {
  weather: WeatherData | null;
  thermal: ThermalAnomaly | null;
  population: number;
  loading: boolean;
}

const METRIC_TOOLTIPS: Record<string, string> = {
  'sıcaklık': 'Anlık hava sıcaklığı (2 metre irtifada). Open-Meteo API üzerinden alınır. Heatwave eşiği: 35°C (iklim çarpanı 1.5x), 30°C (1.2x).',
  'toprak': 'Toprak nemi 0-7 cm derinlik arasında hacimsel su içeriği (m³/m³). Bitki su stresi ve kuraklık göstergesi. 0.10 altı kritik kuraklık.',
  'rüzgar': 'Anlık rüzgar hızı (10 metre irtifada, km/s). Yangın yayılımı ve termal anomali risk değlendirmesinde kullanılır.',
  'termal': 'NASA FIRMS (VIIRS SNPP) uydu verisiyle tespit edilen sıcaklık anomalisi nokta sayısı. >10: UYARI, >50: KRİTİK. Yangın veya sınır ötesi ısı kaynağını gösterir.',
  'nüfus': 'Türkiye nüfusu (Dünya Bankası). RSI hesaplamasında su talebi parçası olarak kullanılır (nüfus/1.000.000 × 0.15).',
};

const CARD_CONFIGS = [
  {
    key: 'sıcaklık',
    icon: Thermometer,
    label: 'Sıcaklık',
    getValue: (w: WeatherData | null) => w ? `${w.temperature}°C` : '--',
    getUnit: () => 'Anlık',
    color: 'text-orange-400',
  },
  {
    key: 'toprak',
    icon: Droplets,
    label: 'Toprak Nemi',
    getValue: (w: WeatherData | null) => w ? `${(w.soilMoisture * 100).toFixed(1)}%` : '--',
    getUnit: () => '0-7cm',
    color: 'text-blue-400',
  },
  {
    key: 'rüzgar',
    icon: Wind,
    label: 'Rüzgar',
    getValue: (w: WeatherData | null) => w ? `${w.windSpeed} km/s` : '--',
    getUnit: () => 'Anlık',
    color: 'text-cyan-400',
  },
  {
    key: 'termal',
    icon: Flame,
    label: 'Termal Anomali',
    getValue: (_w: WeatherData | null, t: ThermalAnomaly | null) => t ? `${t.count}` : '--',
    getUnit: (t: ThermalAnomaly | null) => t?.status ?? 'Normal',
    color: 'text-red-400',
  },
  {
    key: 'nüfus',
    icon: Users,
    label: 'Nüfus (TR)',
    getValue: (_w: WeatherData | null, _t: ThermalAnomaly | null, pop: number) => `${(pop / 1_000_000).toFixed(1)}M`,
    getUnit: () => 'Dünya Bankası',
    color: 'text-purple-400',
  },
];

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

  return (
    <div className="grid grid-cols-2 gap-2">
      {CARD_CONFIGS.map(({ key, icon: Icon, label, getValue, getUnit, color }) => (
        <div key={key} className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-1 mb-1">
            <Icon className={`h-3.5 w-3.5 ${color}`} />
            <span className="text-[10px] text-muted-foreground font-mono tracking-wide">{label}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[260px] text-xs">
                {METRIC_TOOLTIPS[key]}
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-lg font-bold font-mono text-foreground">
            {getValue(weather, thermal, population)}
          </div>
          <div className="text-[9px] text-muted-foreground font-mono">
            {getUnit(thermal)}
          </div>
        </div>
      ))}
    </div>
  );
}
