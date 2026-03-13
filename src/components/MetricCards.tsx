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
  'rüzgar': 'Anlık rüzgar hızı (10 metre irtifada, km/s). Yangın yayılımı ve termal anomali risk değerlendirmesinde kullanılır.',
  'termal': 'NASA FIRMS (VIIRS SNPP) uydu verisiyle tespit edilen sıcaklık anomalisi nokta sayısı. >10: UYARI, >50: KRİTİK. Yangın veya sınır ötesi ısı kaynağını gösterir.',
  'nüfus': 'Türkiye\'nin Dünya Bankası (SP.POP.TOTL) verisi. RSI hesaplamasında su talebi parçası olarak kullanılır (nüfus/1.000.000 × 0.15).',
};

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
      tooltipKey: 'sıcaklık',
    },
    {
      icon: Droplets,
      label: 'Toprak Nemi',
      value: `${((weather?.soilMoisture ?? 0) * 100).toFixed(1)}%`,
      sub: '0-7cm',
      tooltipKey: 'toprak',
    },
    {
      icon: Wind,
      label: 'Rüzgar',
      value: `${weather?.windSpeed?.toFixed(1) ?? '--'} km/s`,
      sub: 'Anlık',
      tooltipKey: 'rüzgar',
    },
    {
      icon: Flame,
      label: 'Termal Anomali',
      value: `${thermal?.count ?? 0}`,
      sub: thermal?.status ?? 'NORMAL',
      alert: thermal?.status === 'KRİTİK',
      tooltipKey: 'termal',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div key={m.label} className={`rounded-lg border bg-card p-3 ${
            m.alert ? 'border-critical/60 glow-critical' : 'border-border'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <m.icon className="h-3 w-3 text-primary" />
                <span className="text-[9px] text-muted-foreground font-mono">{m.label}</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-2.5 w-2.5 cursor-help opacity-50 hover:opacity-100 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[240px] text-xs">
                  {METRIC_TOOLTIPS[m.tooltipKey]}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-xl font-mono text-foreground">{m.value}</div>
            <div className={`text-[9px] font-mono ${
              m.alert ? 'text-critical' : 'text-muted-foreground'
            }`}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3 text-primary" />
          <span className="text-[9px] text-muted-foreground font-mono">Nüfus (TR)</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-2.5 w-2.5 cursor-help opacity-50 hover:opacity-100 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[240px] text-xs">
              {METRIC_TOOLTIPS['nüfus']}
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-sm font-mono text-foreground">{(population / 1_000_000).toFixed(1)}M</span>
      </div>
    </div>
  );
}
