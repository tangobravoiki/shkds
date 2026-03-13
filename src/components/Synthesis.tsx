import { Basin } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface SynthesisProps {
  basin: Basin;
}

export function Synthesis({ basin }: SynthesisProps) {
  return (
    <div className="border-t border-border bg-card/30 px-4 py-4">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono mb-2 tracking-wider">
        ▸ AKADEMİK SENTEZ
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[320px] text-xs">
            Seçili havzayı ele alan akademik ve teknik özet. Hidropolitik anlaşmazlık potansiyeli, nehir akış özellikleri, iklim değişikliği projeksiyonları ve biyolojik çeşitlilik verileri derlenerek oluşturulmuştur.
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{basin.synthesis}</p>
      <div className="mt-3 text-[9px] text-muted-foreground/60 font-mono">
        Referanslar: Open-Meteo API, World Bank DataBank, NASA FIRMS, DSİ Genel Müdürlüğü, FAO AQUASTAT
      </div>
    </div>
  );
}
