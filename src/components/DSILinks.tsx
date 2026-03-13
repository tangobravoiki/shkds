import { Basin } from '@/lib/types';
import { ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface DSILinksProps {
  basin: Basin;
}

export function DSILinks({ basin }: DSILinksProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        ▸ DSİ İSTATİSTİKLERİ
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3 w-3 cursor-help opacity-60 hover:opacity-100" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[260px] text-xs">
            Devlet Su İşleri (DSİ) ve Meteoroloji Genel Müdürlüğü (MGMM) resmi veri kaynaklarına hızlı erişim bağlantıları. Nehir akış ölçüm istasyonları, rezervuar seviyeleri ve iklim gözlemlerine ulaşmak için kullanın.
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-2">
        {basin.dsiLinks.map((link, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded bg-secondary/30 hover:bg-secondary/60 transition-colors text-xs font-mono text-foreground group"
              >
                <ExternalLink className="h-3 w-3 text-primary shrink-0" />
                <span className="group-hover:text-primary transition-colors">{link.title}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent className="max-w-[240px] text-xs">
              {link.title.includes('DSİ') || link.title.includes('DSI')
                ? `DSİ resmi istatistik portaline yönlendirir. Meriç Havzası nehir debileri, baraj doluluk oranları ve yıllık su bütçesi verilerine erişin.`
                : `MGMM (Meteoroloji Genel Müdürlüğü) iklim gözlem ağı. Edirne/Meriç havzası sıcaklık, yağış ve nem kayıtlarına erişin.`
              }
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
