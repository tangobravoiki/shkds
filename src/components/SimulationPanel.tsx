import { BLRParams } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface SimulationPanelProps {
  blr: BLRParams;
  onChange: (blr: BLRParams) => void;
}

const BLR_LABELS: { key: keyof BLRParams; label: string; icon: string; tooltip: string }[] = [
  {
    key: 'government',
    label: 'Hükümet',
    icon: '🏙️',
    tooltip: 'Kurumsal kapasite ve yönetişim dirençliliği. 0: tamamen çökmüş, 1: güçlü ve işlevsel. NATO BLR boyutu: devlet otoritesi, kriz yönetimi, koordinasyon kapasitesi.',
  },
  {
    key: 'energy',
    label: 'Enerji',
    icon: '⚡',
    tooltip: 'Enerji altyapısı ve arz güvenliği dirençliliği. 0: kritik kesinti, 1: tam kapasite. Elektrik, doğalgaz, yakıt depolama ve dağıtım şebekesi dahildir.',
  },
  {
    key: 'population',
    label: 'Nüfus',
    icon: '👥',
    tooltip: 'Toplumsal uyum ve sivil dirençlilik kapasitesi. 0: sosyal çöküş/göç, 1: güçlü toplumsal yapı. Göç baskısı, sosyal kutu plaması ve demografik açıklar dikkate alınır.',
  },
  {
    key: 'foodWater',
    label: 'Gıda/Su',
    icon: '🍾',
    tooltip: 'Gıda ve su arz güvenliği dirençliliği. 0: açlık/susuzluk riski kritik, 1: tam yeterlilik. Sulama kapasitesi, depo rezervleri ve sınır ötesi su paylaşım anlaşmaları dahildir.',
  },
  {
    key: 'health',
    label: 'Sağlık',
    icon: '🏥',
    tooltip: 'Sağlık altyapısı kapasitesi ve halk sağlığı dirençliliği. 0: sistem çökmüş, 1: tam kapasiteli. Hastane yoğunluğu, tıbbi malzeme ve sınır ötesi sağlık işbirliği dahildir.',
  },
  {
    key: 'communication',
    label: 'İletişim',
    icon: '📡',
    tooltip: 'Telekominikasyon ve bilgi ağı dirençliliği. 0: tam karartma, 1: güçlü altyapı. İnternet, mobil, radyo ve askeri şifreli iletişim hatları dahildir.',
  },
  {
    key: 'transportation',
    label: 'Ulaşım',
    icon: '🚚',
    tooltip: 'Ulaşım ve lojistik altyapısı dirençliliği. 0: kritik tıkanma/kapanma, 1: tam işlevselliğ. Kara, hava, demir ve deniz yolu ağları; sınır kapıları dahildir.',
  },
];

export function SimulationPanel({ blr, onChange }: SimulationPanelProps) {
  const handleChange = (key: keyof BLRParams, value: number[]) => {
    onChange({ ...blr, [key]: value[0] });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono mb-1 tracking-wider">
        ▸ NATO 7BLR SİMÜLASYON KUM HAVUZU
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3 w-3 cursor-help opacity-60 hover:opacity-100" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[280px] text-xs">
            NATO Birlikte Lojistik Bölgesi (BLR) kum havuzu simülasörü. 7 kritik altyapı sektörü için dirençlilik değerlerini manuel olarak ayarlayarak "ya... olsaydı?" senaryolarını test edin. Düşük değer = yüksek zafiyet, yüksek değer = güçlü direnç. Sonuçlar BLR Zafiyet skoru ve vNato'ya anında yansır.
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="text-[9px] text-muted-foreground font-mono mb-4">
        Dirençlilik parametrelerini ayarlayarak risk simülasörunu kullanın
      </div>
      {BLR_LABELS.map(({ key, label, icon, tooltip }) => (
        <div key={key} className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1">
              <span className="text-xs">{icon}</span>
              <span className="text-xs font-mono text-foreground">{label}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-2.5 w-2.5 cursor-help opacity-50 hover:opacity-100 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px] text-xs">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-xs font-mono text-primary">{blr[key].toFixed(2)}</span>
          </div>
          <Slider
            value={[blr[key]]}
            min={0}
            max={1}
            step={0.05}
            onValueChange={(v) => handleChange(key, v)}
            className="w-full"
          />
        </div>
      ))}
      <div className="text-[8px] text-muted-foreground font-mono mt-2 opacity-70">
        ℹ Düşük değerler yüksek zafiyet, yüksek değerler güçlü dirençliliği ifade eder.
      </div>
    </div>
  );
}
