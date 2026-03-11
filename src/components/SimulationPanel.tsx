import { BLRParams } from '@/lib/types';
import { Slider } from '@/components/ui/slider';

interface SimulationPanelProps {
  blr: BLRParams;
  onChange: (blr: BLRParams) => void;
}

const BLR_LABELS: { key: keyof BLRParams; label: string; icon: string }[] = [
  { key: 'government', label: 'Hükümet', icon: '🏛️' },
  { key: 'energy', label: 'Enerji', icon: '⚡' },
  { key: 'population', label: 'Nüfus', icon: '👥' },
  { key: 'foodWater', label: 'Gıda/Su', icon: '🌾' },
  { key: 'health', label: 'Sağlık', icon: '🏥' },
  { key: 'communication', label: 'İletişim', icon: '📡' },
  { key: 'transportation', label: 'Ulaşım', icon: '🚛' },
];

export function SimulationPanel({ blr, onChange }: SimulationPanelProps) {
  const handleChange = (key: keyof BLRParams, value: number[]) => {
    onChange({ ...blr, [key]: value[0] });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-[10px] text-muted-foreground font-mono mb-1 tracking-wider">
        ▸ NATO 7BLR SİMÜLASYON KUM HAVUZU
      </div>
      <div className="text-[9px] text-muted-foreground font-mono mb-4">
        Dirençlilik parametrelerini ayarlayarak risk simülasyonu yapın
      </div>

      <div className="space-y-3">
        {BLR_LABELS.map(({ key, label, icon }) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-mono text-foreground">
                {icon} {label}
              </span>
              <span className="text-xs font-mono text-primary">
                {blr[key].toFixed(2)}
              </span>
            </div>
            <Slider
              value={[blr[key]]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => handleChange(key, v)}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 p-2 bg-secondary/30 rounded text-[10px] text-muted-foreground font-mono">
        ℹ Düşük değerler yüksek zafiyet, yüksek değerler güçlü dirençlilik ifade eder.
      </div>
    </div>
  );
}
