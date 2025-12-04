# Ako nahrať media súbory na produkčný server

## 📦 Možnosť 1: Zip archív (najjednoduchšie)

### 1. Vytvor zip archív:
```bash
./scripts/prepare-media-upload.sh
```

### 2. Nahraj zip na server:
- **Ak máš SSH prístup:**
  ```bash
  scp ./media-upload-YYYYMMDD_HHMMSS.zip user@server:/cesta/k/projektu/
  ```

- **Ak používaš FTP/SFTP:**
  - Pripoj sa cez FileZilla alebo podobný klient
  - Nahraj zip archív na server

### 3. Rozbaliť na serveri:
```bash
# Na serveri:
cd /cesta/k/projektu
unzip media-upload-YYYYMMDD_HHMMSS.zip -d public/
```

---

## 📤 Možnosť 2: Cez Payload Admin UI

1. **Otvor produkčný Admin UI:**
   - Choď na: `https://tvoja-domena.com/admin`
   - Prihlás sa

2. **Prejdi na Media:**
   - V ľavom menu klikni na **"Media"**

3. **Nahraj súbory:**
   - Klikni **"Upload"** alebo **"Create New"**
   - Vyber všetky súbory z `public/media/` lokálne
   - Nahraj ich

**Poznámka:** Toto môže byť pomalé pre veľa súborov.

---

## 🔧 Možnosť 3: Cez Payload API (pokročilé)

Ak máš API key a chceš automatizovať:

```bash
# Najprv nainštaluj tsx (ak ešte nie je):
pnpm add -D tsx

# Potom spusti:
pnpm tsx scripts/upload-media-to-production.ts \
  --api-url="https://tvoja-domena.com/api" \
  --api-key="tvoj-api-key"
```

---

## ✅ Po nahratí súborov:

1. **Revaliduj Next.js cache** (ak používaš Next.js):
   ```bash
   # Na serveri alebo cez deployment:
   pnpm build
   ```

2. **Skontroluj stránky:**
   - Otvor produkčnú stránku
   - Skontroluj, či sa obrázky zobrazujú

---

## 🐛 Riešenie problémov

### Obrázky sa stále nezobrazujú:
- Skontroluj, či sú súbory v správnom priečinku: `public/media/`
- Skontroluj oprávnenia súborov (mali by byť čitateľné)
- Skontroluj, či Next.js cache je vyčistený

### Zip archív je príliš veľký:
- Rozdeľ ho na menšie časti
- Alebo použij `rsync` namiesto zip:
  ```bash
  rsync -avz public/media/ user@server:/cesta/k/projektu/public/media/
  ```

---

## 📝 Aktuálny stav:

✅ **Stránky:** Importované do MongoDB Atlas (5 stránok)
✅ **Media dokumenty:** Importované do MongoDB Atlas (15 dokumentov)
⏳ **Media súbory:** Čakajú na upload (78 súborov, 13MB)

Zip archív je pripravený: `./media-upload-YYYYMMDD_HHMMSS.zip`


