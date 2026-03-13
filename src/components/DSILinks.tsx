import { Basin } from '@/lib/types';
import { ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface DSILinksProps {
  basin: Basin;
}

export function DSILinks({ basin }: DSILinksProps) {
  const links = basin.links;

  if (!links || links.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        ▸ DSİ İSTATİSTİKLERİ
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[280px] text-xs">
            Seçili havzaya ait resmi DSİ ve MGMM veri kaynaklarına doğrudan bağlantılar. Bu kaynaklar baraj doluluk oranları, nehir akış istatistikleri ve iklim gzlem verilerini içerir.
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-2">
        {links.map((link, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded bg-secondary/30 hover:bg-secondary/60 transition-colors text-xs font-mono group"
              >
                <ExternalLink className="h-3 w-3 text-primary shrink-0" />
                <span className="group-hover:text-primary transition-colors">{link.title}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent className="max-w-[240px] text-xs">
              {
                link.title.includes('DSİ') || link.title.includes('DSI')
                  ? 'DSİ resmi istatistik portaline yönlendirir. Meriç Havzası nehir debileri, baraj doluluk oranları ve yıllık su bütçesi verilerini içerir.'
                  : 'MGMM (Meteoroloji Genel Müdürlüğü) iklim gözlem ağı. Edirne/Meriç havzası sıcaklık, yağış ve nem kayıtlarına erişimi sağlar.'
              }
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
