import { ForecastDay } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ForecastChartProps {
  forecast: ForecastDay[];
  loading: boolean;
}

export function ForecastChart({ forecast, loading }: ForecastChartProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">▸ 7 GÜNLÜK PROJEKSİYON</div>
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
      <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">▸ 7 GÜNLÜK İKLİMSEL PROJEKSİYON</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 14%)" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: 'hsl(220 10% 45%)', fontFamily: 'Share Tech Mono' }}
            axisLine={{ stroke: 'hsl(220 20% 14%)' }}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(220 10% 45%)', fontFamily: 'Share Tech Mono' }}
            axisLine={{ stroke: 'hsl(220 20% 14%)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220 25% 8%)',
              border: '1px solid hsl(220 20% 14%)',
              borderRadius: '6px',
              fontFamily: 'Share Tech Mono',
              fontSize: '11px',
              color: 'hsl(180 20% 85%)',
            }}
          />
          <Bar dataKey="Max °C" fill="hsl(0 72% 51%)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Min °C" fill="hsl(199 89% 48%)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Yağış mm" fill="hsl(168 76% 50%)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
