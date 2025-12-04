#!/bin/bash

# Script na import stránok do MongoDB Atlas
# Použitie: ./scripts/import-to-atlas.sh

echo "📦 Import stránok do MongoDB Atlas"
echo ""

# Cesta k exportu
EXPORT_PATH="./database-exports/shadcn-blocks/pages.bson"

if [ ! -f "$EXPORT_PATH" ]; then
  echo "❌ Exportovaný súbor nebol nájdený: $EXPORT_PATH"
  exit 1
fi

echo "✅ Našiel som exportovaný súbor: $EXPORT_PATH"
echo ""

# Opýtaj sa na heslo a názov databázy
read -sp "Zadajte MongoDB Atlas heslo: " PASSWORD
echo ""

read -p "Zadajte názov databázy (alebo Enter pre 'shadcn-blocks'): " DB_NAME
DB_NAME=${DB_NAME:-shadcn-blocks}

# Vytvor URI s heslom
ATLAS_URI="mongodb+srv://davidchvostal:${PASSWORD}@cluster0.dirww2k.mongodb.net/${DB_NAME}?appName=Cluster0"

echo ""
echo "⚠️  POZOR: Tento import prepíše existujúce stránky v produkčnej databáze!"
echo "   Databáza: $DB_NAME"
read -p "Pokračovať? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Import zrušený"
  exit 0
fi

echo ""
echo "📥 Importujem stránky do MongoDB Atlas..."

# Import
mongorestore --uri="$ATLAS_URI" --collection=pages --drop "$EXPORT_PATH"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Import dokončený úspešne!"
  echo "   Stránky sú teraz v produkčnej databáze na MongoDB Atlas."
else
  echo ""
  echo "❌ Chyba pri importe"
  echo "💡 Skontrolujte:"
  echo "   - Heslo je správne"
  echo "   - Názov databázy je správny"
  echo "   - Máte prístup k databáze"
  exit 1
fi


