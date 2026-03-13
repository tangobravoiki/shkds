import { Basin } from '@/lib/types';
import { BASINS } from '@/lib/basins';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, FileText, Shield } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HeaderProps {
  selectedBasin: Basin;
  onBasinChange: (id: string) => void;
  onExportJSON: () => void;
  onExportTXT: () => void;
}

export function Header({ selectedBasin, onBasinChange, onExportJSON, onExportTXT }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Shield className="h-6 w-6 text-primary cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[260px] text-xs">
              Sınıraşan Havzalar Karar Destek Sistemi (KDS) v4.2. NATO standartlarına uygun hidropolitik risk değerlendirme platformu. Gerçek zamanlı meteoroloji, termal anomali ve OSINT verilerini birleştirerek bütünleşik risk skoru hesaplar.
            </TooltipContent>
          </Tooltip>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-primary glow-text">SINIRAŞAN HAVZALAR KDS</h1>
            <p className="text-xs text-muted-foreground font-mono">v4.2 — Hidropolitik Karar Destek Sistemi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Select value={selectedBasin.id} onValueChange={onBasinChange}>
                  <SelectTrigger className="w-[200px] bg-secondary border-border font-mono text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BASINS.map((b) => (
                      <SelectItem key={b.id} value={b.id} className="font-mono text-sm">
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[240px] text-xs">
              Analiz edilecek sınıraşan havzayı seçin. Her havza için koordinatlar, ülkeler, nehirler, DSI/MGMM bağlantıları ve RSS anahtar kelimeleri otomatik yüklenir.
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onExportJSON} className="font-mono text-xs">
                <Download className="h-3 w-3 mr-1" />
                JSON
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">
              Güncel risk analiz raporunu JSON formatında indirin. Veri işleme, API entegrasyonu ve arşivleme için uygundur.
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onExportTXT} className="font-mono text-xs">
                <FileText className="h-3 w-3 mr-1" />
                TXT
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">
              Güncel risk analiz raporunu okunabilir metin formatında indirin. Brifing ve NATO/KGYS raporlaması için uygundur.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
