# Ako skontrolovať, akú databázu používa produkčná aplikácia

## 🔍 Problém:
Admin panel je prázdny, hoci dáta sú v MongoDB Atlas.

## ✅ Riešenie:

### 1. Skontroluj produkčný `.env` súbor

Produkčná aplikácia musí mať správny `DATABASE_URI` v `.env` súbore.

**Správny connection string by mal byť:**
```
DATABASE_URI=mongodb+srv://davidchvostal:zo9wGFRpqsLSoJ0m@cluster0.dirww2k.mongodb.net/payload?appName=Cluster0
```

**Dôležité:**
- Názov databázy musí byť `payload` (nie `shadcn-blocks`)
- Heslo musí byť správne

### 2. Skontroluj v MongoDB Atlas

1. Otvor: https://cloud.mongodb.com/v2/6887a61403d83738b403a7c2#/overview
2. Klikni na **"Browse Collections"**
3. Skontroluj, či vidíš databázu **`payload`** a kolekciu **`pages`**
4. Skontroluj, či sú tam stránky

### 3. Reštartuj produkčnú aplikáciu

Po zmene `.env` súboru musíš reštartovať aplikáciu:
- **Vercel:** Automaticky sa redeployne po push do Git
- **Vlastný server:** `pm2 restart app` alebo reštart servera
- **Docker:** `docker-compose restart`

### 4. Vymaž cache

- V prehliadači: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- V Next.js: Možno treba rebuild (`pnpm build`)

---

## 🐛 Ak stále nefunguje:

Skontroluj produkčné logy - možno tam uvidíš chybu pri pripojení k databáze.


