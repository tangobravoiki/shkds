import { RiskResult } from '@/lib/types';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
  risk: RiskResult | null;
  loading: boolean;
}

export function RiskGauge({ risk, loading }: RiskGaugeProps) {
  const value = risk?.vNato ?? 0;
  const status = risk?.status ?? 'NORMAL';

  const statusColor = status === 'KRİTİK' 
    ? 'text-critical' 
    : status === 'UYARI' 
    ? 'text-warning' 
    : 'text-primary';

  const barColor = status === 'KRİTİK'
    ? 'bg-critical'
    : status === 'UYARI'
    ? 'bg-warning'
    : 'bg-primary';

  return (
    <div className="rounded-lg border border-border bg-card p-4 glow-teal relative scanline overflow-hidden">
      <div className="text-xs text-muted-foreground font-mono mb-2 tracking-wider">
        ▸ BÜTÜNLEŞIK RİSK İNDEKSİ (vNato)
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-6">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <motion.div
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center my-3"
          >
            <span className={`text-5xl font-bold font-mono ${statusColor}`}>
              {value.toFixed(4)}
            </span>
          </motion.div>

          <div className={`text-center text-sm font-bold tracking-widest mb-3 ${statusColor} ${status === 'KRİTİK' ? 'animate-pulse-critical' : ''}`}>
            ● {status}
          </div>

          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${barColor} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${value * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1">
            <span>0.0</span>
            <span>0.4</span>
            <span>0.7</span>
            <span>1.0</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-muted-foreground">RSI</div>
              <div className="text-foreground">{risk?.rsi.toFixed(4)}</div>
            </div>
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-muted-foreground">vClim</div>
              <div className="text-foreground">{risk?.vClim.toFixed(4)}</div>
            </div>
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-muted-foreground">BLR Zafiyet</div>
              <div className="text-foreground">{risk?.blrVulnerability.toFixed(4)}</div>
            </div>
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-muted-foreground">Op. Risk</div>
              <div className="text-foreground">{risk?.operationalRisk.toFixed(4)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
