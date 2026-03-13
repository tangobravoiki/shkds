import { NewsItem } from '@/lib/types';
import { ExternalLink, Rss } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface NewsFeedProps {
  news: NewsItem[];
  loading: boolean;
}

export function NewsFeed({ news, loading }: NewsFeedProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Rss className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] text-muted-foreground font-mono tracking-wider">▸ OSINT HABER AKISI</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help flex-shrink-0 transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[280px] text-xs">
            Açık kaynak istihbarat (OSINT) haber akışı. Havza ile ilgili anahtar kelimeler (su krizi, taşkın, hidropolitik vb.) kullanılarak RSS kaynaklarından çekilen haberler. Haber sayısı operasyonel risk hesaplamasına katkı yapar.
          </TooltipContent>
        </Tooltip>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 bg-secondary rounded animate-pulse" />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-xs text-muted-foreground font-mono py-4 text-center">
          Haber bulunamadı
        </div>
      ) : (
        <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
          {news.map((item, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors py-1 border-b border-border/30 last:border-0 group"
                >
                  <ExternalLink className="h-3 w-3 mt-0.5 shrink-0 group-hover:text-primary" />
                  <span className="line-clamp-2">{item.title}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent className="max-w-[260px] text-xs">
                OSINT kaynağı: {item.source} — Bağlantıya tıklayarak haberin tam metnine ulaşabilirsiniz.
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
