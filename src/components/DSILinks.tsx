import { Basin } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

interface DSILinksProps {
  basin: Basin;
}

export function DSILinks({ basin }: DSILinksProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">▸ DSİ İSTATİSTİKLERİ</div>
      <div className="space-y-2">
        {basin.dsiLinks.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded bg-secondary/30 hover:bg-secondary/60 transition-colors text-xs font-mono text-foreground group"
          >
            <ExternalLink className="h-3 w-3 text-primary shrink-0" />
            <span className="group-hover:text-primary transition-colors">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
