#!/bin/bash

# Script na synchronizáciu lokálnej databázy do MongoDB Atlas
# Exportuje celú lokálnu DB a importuje ju do Atlas (prepíše všetko!)

# Načítaj DATABASE_URI z .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Lokálna databáza
LOCAL_DB="${LOCAL_DATABASE_URI:-mongodb://localhost:27017/shadcn-blocks}"

# Produkčná databáza (z .env alebo prompt)
PROD_DB="${DATABASE_URI}"

if [ -z "$PROD_DB" ]; then
  echo "❌ DATABASE_URI nie je nastavená v .env"
  read -p "Zadajte URI produkčnej MongoDB Atlas databázy: " PROD_DB
fi

if [ -z "$PROD_DB" ]; then
  echo "❌ Produkčná databáza URI je povinná"
  exit 1
fi

# Zisti názov databázy z URI
DB_NAME=$(echo "$LOCAL_DB" | sed -n 's/.*\/\([^?]*\).*/\1/p')
if [ -z "$DB_NAME" ]; then
  DB_NAME="shadcn-blocks"
fi

echo "🔄 Synchronizácia databázy do MongoDB Atlas"
echo "   Zdroj: $LOCAL_DB"
echo "   Cieľ: $PROD_DB"
echo "   Databáza: $DB_NAME"
echo ""

# Vytvor dočasný export
TEMP_DIR="./temp-sync-export-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$TEMP_DIR"

echo "📥 Exportujem lokálnu databázu..."
if command -v mongodump &> /dev/null; then
  mongodump --uri="$LOCAL_DB" --out="$TEMP_DIR"

  if [ $? -eq 0 ]; then
    echo "✅ Export dokončený"
    echo ""
    echo "⚠️  POZOR: Tento import prepíše celú produkčnú databázu!"
    read -p "Pokračovať? (yes/no): " confirm

    if [ "$confirm" = "yes" ]; then
      echo ""
      echo "📤 Importujem do MongoDB Atlas..."

      # Zisti názov databázy v Atlas (alebo použij rovnaký)
      ATLAS_DB_NAME=$(echo "$PROD_DB" | sed -n 's/.*\/\([^?]*\).*/\1/p')
      if [ -z "$ATLAS_DB_NAME" ]; then
        ATLAS_DB_NAME="$DB_NAME"
      fi

      mongorestore --uri="$PROD_DB" --db="$ATLAS_DB_NAME" --drop "$TEMP_DIR/$DB_NAME"

      if [ $? -eq 0 ]; then
        echo "✅ Import dokončený úspešne!"
        echo "   Databáza '$ATLAS_DB_NAME' bola synchronizovaná"
      else
        echo "❌ Chyba pri importe"
        rm -rf "$TEMP_DIR"
        exit 1
      fi
    else
      echo "❌ Import zrušený"
    fi

    # Vymaž dočasný export
    rm -rf "$TEMP_DIR"
  else
    echo "❌ Chyba pri exporte"
    rm -rf "$TEMP_DIR"
    exit 1
  fi
else
  echo "❌ mongodump nie je nainštalovaný"
  echo "💡 Nainštalujte MongoDB Database Tools"
  exit 1
fi


