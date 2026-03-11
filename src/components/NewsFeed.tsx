import { NewsItem } from '@/lib/types';
import { ExternalLink, Rss } from 'lucide-react';

interface NewsFeedProps {
  news: NewsItem[];
  loading: boolean;
}

export function NewsFeed({ news, loading }: NewsFeedProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Rss className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] text-muted-foreground font-mono tracking-wider">▸ OSINT HABER AKIŞI</span>
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
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 rounded bg-secondary/30 hover:bg-secondary/60 transition-colors group"
            >
              <div className="flex items-start gap-2">
                <ExternalLink className="h-3 w-3 text-primary mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="min-w-0">
                  <div className="text-xs text-foreground line-clamp-2 leading-relaxed">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {item.source} • {item.pubDate ? new Date(item.pubDate).toLocaleDateString('tr-TR') : ''}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
