# Ako zistiť alebo resetovať MongoDB Atlas heslo

## 🔑 Kde nájsť/resetovať heslo:

1. **Otvor MongoDB Atlas Dashboard:**
   - Choď na: https://cloud.mongodb.com/v2/6887a61403d83738b403a7c2#/overview

2. **V ľavom menu klikni na "Database Access"** (alebo "Security" → "Database Access")

3. **Nájdi používateľa `davidchvostal`** v zozname

4. **Klikni na "Edit"** (alebo tri bodky → "Edit")

5. **Dve možnosti:**
   - **Ak vidíš heslo** (maskované) → skopíruj ho
   - **Ak nevidíš heslo** → klikni na **"Edit Password"** a nastav nové heslo

6. **Ulož zmeny**

---

## 📝 Alternatíva: Vytvor nového používateľa

Ak nevieš heslo a nechceš ho resetovať:

1. V "Database Access" klikni **"Add New Database User"**
2. Vyber **"Password"** metódu
3. Nastav:
   - Username: `davidchvostal` (alebo iný)
   - Password: (vymysli si heslo)
   - Database User Privileges: **"Atlas admin"** alebo **"Read and write to any database"**
4. Klikni **"Add User"**
5. **Zapíš si heslo!**

---

## ✅ Po zistení hesla:

Spusti import script:
```bash
./scripts/import-to-atlas.sh
```

Script sa opýta na heslo - zadaj ho tam.


