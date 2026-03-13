import { ForecastDay } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ForecastChartProps {
  forecast: ForecastDay[];
  loading: boolean;
}

export function ForecastChart({ forecast, loading }: ForecastChartProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
          ▸ 7 GÜNLÜK İKLİMSEL PROJEKSİYON
        </div>
        <div className="h-[180px] bg-secondary/30 rounded animate-pulse" />
      </div>
    );
  }

  const data = forecast.map((d) => ({
    date: d.date.slice(5),
    'Max °C': d.tempMax,
    'Min °C': d.tempMin,
    'Yağış mm': d.precipitation,
  }));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        ▸ 7 GÜNLÜK İKLİMSEL PROJEKSİYON
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px] text-xs">
            Open-Meteo API üzerinden alınan 7 günlük hava tahmin verileri. Kırmızı çubuklar maksimum/minimum sıcaklık (°C), mavi çubuklar günlük toplam yağış (mm) gösterir. Taşkın risk değlendirmesinde ileriye dönük yağış trendi kritik önem taşır.
          </TooltipContent>
        </Tooltip>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#888' }} />
          <YAxis tick={{ fontSize: 9, fill: '#888' }} />
          <RechartsTooltip
            contentStyle={{
              backgroundColor: '#1a1a2e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              fontSize: '11px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
          <Bar dataKey="Max °C" fill="#ef4444" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Min °C" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Yağış mm" fill="#06b6d4" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
