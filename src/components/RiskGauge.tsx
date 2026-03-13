import { RiskResult } from '@/lib/types';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface RiskGaugeProps {
  risk: RiskResult | null;
  loading: boolean;
}

const RISK_TOOLTIPS = {
  vNato: 'Bütünleşik Risk İndeksi (vNato): RSI, vClim, BLR Zafiyet ve Operasyonel Risk bileşenlerinin ağırlıklı ortalamasıyla hesaplanan 0-1 arası toplam risk skoru. 0.4 altı NORMAL, 0.4-0.7 UYARI, 0.7 üzeri KRİTİK.',
  rsi: 'Su Güvenlik İndeksi (RSI): Nüfus talebini meteorolojik arzla karşılaştıran oran. Yüksek değer → su stresi yüksek. Sıcaklık eşiği aşıldığında iklim çarpanı devreye girer.',
  vClim: 'İklimsel Kırılganlık (vClim): Anlık sıcaklığın 25-50°C referans aralığına göre normalize edilmiş değeri. 25°C altında 0, 50°C üzerinde 1 alır. Heatwave riskini temsil eder.',
  blr: 'BLR Zafiyet: NATO 7 Birlikte Lojistik Bölgesi (Hükümet, Enerji, Nüfus, Gıda/Su, Sağlık, İletişim, Ulaşım) dirençlilik skorlarından hesaplanan toplam zafiyet endeksi.',
  opRisk: 'Operasyonel Risk: Nehir debisi akış anormallikleri ve OSINT haber akışı yoğunluğuna dayalı saha risk göstergesi. Termal anomali verileriyle birleştirilerek hesaplanır.',
};

export function RiskGauge({ risk, loading }: RiskGaugeProps) {
  const value = risk?.vNato ?? 0;
  const status = risk?.status ?? 'NORMAL';

  const statusColor =
    status === 'KRİTİK'
      ? 'text-critical'
      : status === 'UYARI'
      ? 'text-warning'
      : 'text-primary';

  const barColor =
    status === 'KRİTİK'
      ? 'bg-critical'
      : status === 'UYARI'
      ? 'bg-warning'
      : 'bg-primary';

  const SubMetric = ({
    label,
    value,
    tooltipKey,
  }: {
    label: string;
    value: string;
    tooltipKey: keyof typeof RISK_TOOLTIPS;
  }) => (
    <div className="rounded bg-secondary/40 p-2">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[10px] text-muted-foreground font-mono">{label}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[280px] text-xs">
            {RISK_TOOLTIPS[tooltipKey]}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="text-sm font-mono text-foreground">{value}</div>
    </div>
  );

  return (
    <div className="rounded-lg border border-border bg-card p-4 glow-teal relative scanline overflow-hidden">
      <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono mb-2 tracking-wider">
        ▸ BÜTÜNLEŞIK RİSK İNDEKSİ (vNato)
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[280px] text-xs">
            {RISK_TOOLTIPS.vNato}
          </TooltipContent>
        </Tooltip>
      </div>
      {loading ? (
        <div className="h-24 bg-secondary/30 rounded animate-pulse" />
      ) : (
        <>
          <motion.div
            className={`text-5xl font-bold font-mono ${statusColor} mb-1`}
            key={value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {value.toFixed(4)}
          </motion.div>

          <div className={`text-xs font-mono ${statusColor} mb-3`}>● {status}</div>

          <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-1">
            <motion.div
              className={`h-full ${barColor} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${value * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground font-mono mb-4">
            <span>0.0</span><span>0.4</span><span>0.7</span><span>1.0</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <SubMetric label="RSI" value={risk?.rsi.toFixed(4) ?? '0'} tooltipKey="rsi" />
            <SubMetric label="vClim" value={risk?.vClim.toFixed(4) ?? '0'} tooltipKey="vClim" />
            <SubMetric label="BLR Zafiyet" value={risk?.blrVulnerability.toFixed(4) ?? '0'} tooltipKey="blr" />
            <SubMetric label="Op. Risk" value={risk?.operationalRisk.toFixed(4) ?? '0'} tooltipKey="opRisk" />
          </div>
        </>
      )}
    </div>
  );
}
