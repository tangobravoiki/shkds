import { Basin } from '@/lib/types';

interface SynthesisProps {
  basin: Basin;
}

export function Synthesis({ basin }: SynthesisProps) {
  return (
    <div className="border-t border-border bg-card/30 px-4 py-4">
      <div className="text-[10px] text-muted-foreground font-mono mb-2 tracking-wider">▸ AKADEMİK SENTEZ</div>
      <p className="text-xs text-muted-foreground leading-relaxed">{basin.synthesis}</p>
      <div className="mt-3 text-[9px] text-muted-foreground/60 font-mono">
        Referanslar: Open-Meteo API, World Bank DataBank, NASA FIRMS, DSİ Genel Müdürlüğü, FAO AQUASTAT
      </div>
    </div>
  );
}
