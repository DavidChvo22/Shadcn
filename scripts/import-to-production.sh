#!/bin/bash

# Script na import stránok do produkčnej databázy
# Použitie: ./scripts/import-to-production.sh

echo "📦 Import stránok do produkčnej databázy"
echo ""

# Cesta k exportu
EXPORT_PATH="./database-exports/shadcn-blocks/pages.bson"

if [ ! -f "$EXPORT_PATH" ]; then
  echo "❌ Exportovaný súbor nebol nájdený: $EXPORT_PATH"
  echo "💡 Najprv spustite export: mongodump --db=shadcn-blocks --collection=pages --out=./database-exports"
  exit 1
fi

echo "✅ Našiel som exportovaný súbor: $EXPORT_PATH"
echo ""

# Opýtaj sa na produkčnú URI
read -p "Zadajte URI produkčnej MongoDB databázy: " PROD_URI

if [ -z "$PROD_URI" ]; then
  echo "❌ URI je povinná"
  exit 1
fi

echo ""
echo "⚠️  POZOR: Tento import prepíše existujúce stránky v produkčnej databáze!"
read -p "Pokračovať? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Import zrušený"
  exit 0
fi

echo ""
echo "📥 Importujem stránky..."

# Zisti názov databázy z URI (alebo použij default)
DB_NAME=$(echo "$PROD_URI" | sed -n 's/.*\/\([^?]*\).*/\1/p')
if [ -z "$DB_NAME" ]; then
  DB_NAME="shadcn-blocks"
fi

echo "   Databáza: $DB_NAME"
echo "   URI: $PROD_URI"
echo ""

# Import
mongorestore --uri="$PROD_URI" --db="$DB_NAME" --collection=pages --drop "$EXPORT_PATH"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Import dokončený úspešne!"
  echo "   Stránky sú teraz v produkčnej databáze."
else
  echo ""
  echo "❌ Chyba pri importe"
  exit 1
fi


