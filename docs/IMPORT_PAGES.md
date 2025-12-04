# Návod na import stránok do MongoDB

Tento dokument popisuje rôzne spôsoby, ako naplniť MongoDB databázu stránkami, ktoré máte vytvorené lokálne.

## 📋 Obsah

1. [Rýchly export/import cez mongodump](#1-rýchly-exportimport-cez-mongodump)
2. [Import cez Payload script](#2-import-cez-payload-script)
3. [Manuálny import cez Payload Admin UI](#3-manuálny-import-cez-payload-admin-ui)
4. [Import cez MongoDB Compass](#4-import-cez-mongodb-compass)

---

## 1. Rýchly export/import cez mongodump

**Najrýchlejší spôsob pre celú databázu alebo konkrétne kolekcie.**

### Export z lokálnej databázy:

```bash
# Export celej databázy
./scripts/export-db.sh

# Alebo manuálne:
mongodump --uri="mongodb://localhost:27017/payload" --out="./database-exports/backup-$(date +%Y%m%d)"
```

### Import do produkčnej databázy:

```bash
# Import cez script
./scripts/import-db.sh ./database-exports/payload-export-20240101_120000

# Alebo manuálne:
mongorestore --uri="mongodb://production-uri" --drop ./database-exports/payload-export-20240101_120000/payload
```

### Export len kolekcie `pages`:

```bash
mongodump --uri="mongodb://localhost:27017/payload" --collection=pages --out="./pages-export"
```

### Import len kolekcie `pages`:

```bash
mongorestore --uri="mongodb://production-uri" --collection=pages --drop ./pages-export/payload/pages.bson
```

---

## 2. Import cez Payload script

**Najlepšie pre selektívny import konkrétnych stránok s validáciou.**

### Inštalácia závislostí (ak ešte nie sú):

```bash
pnpm add -D tsx
```

### Export stránok z lokálnej DB:

```bash
pnpm tsx scripts/import-pages.ts export \
  --source-uri="mongodb://localhost:27017/payload" \
  --output="./pages-export.json"
```

### Import stránok do produkčnej DB:

```bash
pnpm tsx scripts/import-pages.ts import \
  --target-uri="mongodb://your-production-uri" \
  --input="./pages-export.json"
```

### Synchronizácia (export + import v jednom kroku):

```bash
pnpm tsx scripts/import-pages.ts sync \
  --source-uri="mongodb://localhost:27017/payload" \
  --target-uri="mongodb://your-production-uri"
```

### Export len pre konkrétny locale:

```bash
pnpm tsx scripts/import-pages.ts export \
  --source-uri="mongodb://localhost:27017/payload" \
  --output="./pages-sk.json" \
  --locale="sk"
```

---

## 3. Manuálny import cez Payload Admin UI

**Najlepšie pre malý počet stránok alebo testovanie.**

1. **Export z lokálnej DB:**
   - Spustite lokálnu aplikáciu: `pnpm dev`
   - Otvorte Admin UI: `http://localhost:3000/admin`
   - Prejdite na **Pages** → vyberte stránky → **Export** (ak je dostupné)

2. **Import do produkčnej DB:**
   - Spustite produkčnú aplikáciu
   - Otvorte Admin UI
   - Prejdite na **Pages** → **Import** (ak je dostupné)
   - Alebo vytvorte stránky manuálne cez **Create New**

---

## 4. Import cez MongoDB Compass

**Vizuálny spôsob pre tých, ktorí preferujú GUI.**

1. **Export z lokálnej DB:**
   - Otvorte MongoDB Compass
   - Pripojte sa k lokálnej databáze
   - Vyberte kolekciu `pages`
   - Kliknite na **Export Collection** → vyberte formát (JSON, CSV)

2. **Import do produkčnej DB:**
   - Pripojte sa k produkčnej databáze v Compass
   - Vyberte alebo vytvorte kolekciu `pages`
   - Kliknite na **Import Data** → vyberte exportovaný súbor

---

## 🔧 Použitie s Docker

Ak používate Docker pre MongoDB:

### Export:

```bash
# Nájdite container ID
docker ps | grep mongo

# Export cez Docker
docker exec <container-id> mongodump --db=payload --out=/data/backup

# Skopírujte súbory z kontajnera
docker cp <container-id>:/data/backup ./database-exports/backup
```

### Import:

```bash
# Skopírujte súbory do kontajnera
docker cp ./database-exports/backup <container-id>:/data/backup

# Import cez Docker
docker exec <container-id> mongorestore --db=payload --drop /data/backup/payload
```

---

## ⚠️ Dôležité poznámky

1. **Zálohujte produkčnú databázu** pred importom:
   ```bash
   ./scripts/export-db.sh
   ```

2. **Kontrolujte URI** v `.env` súbore:
   ```bash
   # Lokálna DB
   DATABASE_URI=mongodb://localhost:27017/payload

   # Produkčná DB
   DATABASE_URI=mongodb://user:password@host:27017/payload?authSource=admin
   ```

3. **Media súbory** sa neexportujú automaticky - musíte ich skopírovať manuálne z `media/` priečinka

4. **Vzťahy medzi dokumentmi** (napr. `relatedPosts`) sa zachovajú len ak existujú ID v cieľovej databáze

5. **Locale** - stránky môžu mať rôzne locale (`sk`, `en`), uistite sa, že importujete správne

---

## 🐛 Riešenie problémov

### Chyba: "Cannot connect to MongoDB"
- Skontrolujte, či je MongoDB spustený
- Overte URI v `.env` súbore
- Skontrolujte firewall/bezpečnostné nastavenia

### Chyba: "Collection already exists"
- Použite `--drop` flag pri mongorestore
- Alebo vymažte kolekciu pred importom

### Stránky sa nezobrazujú
- Skontrolujte `_status` field - musí byť `"published"`
- Overte `publishedAt` dátum
- Skontrolujte access control v `Pages` kolekcii

---

## 📚 Ďalšie zdroje

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [MongoDB Import/Export Guide](https://www.mongodb.com/docs/manual/reference/program/mongodump/)
- [MongoDB Compass Documentation](https://www.mongodb.com/docs/compass/)


