# Nastavenie Cloudinary pre Media súbory

## Prečo Cloudinary?

Keď nahrávaš obrázky cez admin panel na produkčnom serveri, súbory sa musia ukladať niekde trvalo. Render.com používa Git pre deployment, takže súbory v `public/media/` sa stratia pri redeploy.

**Riešenie:** Použiť Cloudinary, kde sa súbory uložia trvalo a budú dostupné aj po redeploy. Cloudinary má aj automatické optimalizácie obrázkov.

---

## Krok 1: Získaj Cloudinary credentials

Máš už Cloudinary účet s týmito údajmi:
- Cloud name: `dnvzpot8r`
- API Key: `785654522573849`
- API Secret: `<your_api_secret>` (musíš ho zistiť v Cloudinary dashboard)

**Ako zistiť API Secret:**
1. Choď na https://console.cloudinary.com/
2. Prihlás sa
3. Klikni na **"Settings"** (ikona ozubeného kolieska)
4. Prejdi na **"Security"** tab
5. Skopíruj **"API Secret"**

---

## Krok 2: Nastav Environment Variables v Render

V Render Dashboard → tvoj projekt → Environment → pridaj:

```
CLOUDINARY_CLOUD_NAME=dnvzpot8r
CLOUDINARY_API_KEY=785654522573849
CLOUDINARY_API_SECRET=tvoj-api-secret
```

**Dôležité:** Nahraď `tvoj-api-secret` svojím skutočným API Secret z Cloudinary dashboardu.

---

## Krok 3: Lokálne testovanie (voliteľné)

Ak chceš testovať lokálne, pridaj do `.env` súboru:

```
CLOUDINARY_CLOUD_NAME=dnvzpot8r
CLOUDINARY_API_KEY=785654522573849
CLOUDINARY_API_SECRET=tvoj-api-secret
```

**Poznámka:** Ak nemáš Cloudinary env vars lokálne, použije sa lokálny filesystem (`public/media/`).

---

## Krok 4: Commitni a Deploy

```bash
git add .
git commit -m "Add Cloudinary storage for media files"
git push
```

Render automaticky redeployuje a Cloudinary storage bude aktívny.

---

## Ako to funguje:

1. **Lokálne (bez Cloudinary env vars):** Obrázky sa ukladajú do `public/media/`
2. **Produkcia (s Cloudinary env vars):** Obrázky sa nahrávajú do Cloudinary
3. **Admin panel:** Môžeš nahrávať obrázky cez admin a budú uložené v Cloudinary
4. **Trvalosť:** Súbory zostanú v Cloudinary aj po redeploy

---

## Výhody Cloudinary:

- ✅ Automatické optimalizácie obrázkov
- ✅ Rôzne veľkosti obrázkov (thumbnail, medium, large, atď.)
- ✅ CDN distribúcia (rýchle načítanie)
- ✅ Transformácie obrázkov na požiadanie
- ✅ Trvalé uloženie (neprišli sa pri redeploy)

---

## Testovanie:

Po deploy:
1. Otvor admin panel
2. Choď na Media → Upload
3. Nahraj obrázok
4. Skontroluj, či sa zobrazuje správne
5. Skontroluj Cloudinary dashboard, či tam je súbor

---

## Poznámky:

- **Lokálne:** Ak nemáš nastavené Cloudinary env vars lokálne, použije sa lokálny filesystem
- **Produkcia:** Na Render musíš mať nastavené všetky Cloudinary env vars
- **Náklady:** Cloudinary má free tier (25 GB storage, 25 GB bandwidth/mesiac)

