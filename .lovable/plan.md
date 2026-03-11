

## Sınıraşan Havzalar KDS v4.2 — Uygulama Planı

### Genel Bakış
Türkiye'nin sınıraşan havzaları (Meriç-Ergene, Fırat-Dicle, Aras-Kura, Asi) için hidropolitik risk analizi ve karar destek sistemi. Koyu, askeri/teknik tarzda bir arayüz.

### Tasarım
- **Tema**: Koyu arka plan (#05080f), teal/cyan aksanlar (#2dd4bf), monospace veri fontları
- **Font**: Chakra Petch + Share Tech Mono (Google Fonts)
- **Stil**: Panelli, minimal, veri odaklı dashboard görünümü

### Sayfa 1: Ana Dashboard (Tek Sayfa Uygulama)

**Header Bölümü**
- "SINIRAŞAN HAVZALAR KDS" başlığı
- Havza seçici dropdown (4 havza)
- JSON ve TXT rapor dışa aktarım butonları

**Sol Panel (4/12 grid)**
- **Risk İndeksi (vNato)**: Büyük skor göstergesi (0.0000-1.0000), NORMAL/UYARI/KRİTİK durumu, ilerleme çubuğu
- **Metrik Kartlar**: Su Stresi (RSI), Termal Durum (FIRMS anomali)
- **Leaflet Harita**: 4 havzanın koordinatları, tıklanabilir marker'lar, karanlık tema tile'lar

**Sağ Panel (8/12 grid)**
- **Havza Parametreleri**: Open-Meteo'dan sıcaklık, toprak nemi, nehir debisi; World Bank'tan nüfus verisi
- **OSINT Haber Akışı**: RSS kaynaklarından derlenen haberler (ReliefWeb, Google News vb.)
- **7 Günlük İklimsel Projeksiyon**: Çubuk grafik (sıcaklık + yağış)
- **NATO 7BLR Simülasyon Kum Havuzu**: 7 slider ile direnç parametrelerini ayarlama (Hükümet, Enerji, Nüfus, Gıda/Su, Sağlık, İletişim, Ulaşım)
- **DSİ İstatistikleri**: Resmi veri setlerine bağlantılar (indirilebilir dosyalar)

**Alt Bölüm**
- Akademik sentez metni (havzaya göre değişen)
- Referanslar footer'ı

### Veri Kaynakları (Ücretsiz API'ler)
- **Open-Meteo**: Hava durumu ve taşkın verileri (API key gerektirmez)
- **World Bank API**: Demografik veriler (ücretsiz)
- **NASA FIRMS**: Termal anomali tespiti (ücretsiz, CORS proxy ile)
- **RSS2JSON**: Haber akışı dönüştürme (ücretsiz)
- **Leaflet + OpenStreetMap**: Harita görselleştirme (ücretsiz)

### Hesaplama Motoru
- **RSI (Su Stresi İndeksi)**: Talep/arz oranı × iklim frekansı
- **vClim (İklim Riski)**: Sıcaklık bazlı normalize değer
- **vNato (Bütünleşik Risk)**: BLR yapısal zafiyet (%40) + operasyonel risk (%60) + haber/termal cezalar
- CORS proxy zinciri (doğrudan → allorigins → corsproxy.io)

### Özellikler
- Havza seçildiğinde tüm verilerin otomatik güncellenmesi
- Slider'larla gerçek zamanlı risk simülasyonu
- JSON ve TXT formatında rapor indirme
- Responsive grid layout (mobil uyumlu)
- Yükleme göstergeleri (spinner)
- Leaflet haritada havzalar arası geçiş animasyonu

