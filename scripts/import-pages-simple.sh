#!/bin/bash

# Jednoduchý script na import stránok z lokálnej do produkčnej MongoDB
# Použitie: ./scripts/import-pages-simple.sh

# Načítaj DATABASE_URI z .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Lokálna databáza (default)
LOCAL_DB="${LOCAL_DATABASE_URI:-mongodb://localhost:27017/payload}"

# Produkčná databáza (z .env alebo prompt)
PROD_DB="${DATABASE_URI}"

if [ -z "$PROD_DB" ]; then
  echo "❌ DATABASE_URI nie je nastavená v .env"
  read -p "Zadajte URI produkčnej databázy: " PROD_DB
fi

if [ -z "$PROD_DB" ]; then
  echo "❌ Produkčná databáza URI je povinná"
  exit 1
fi

echo "🔄 Exportujem stránky z lokálnej databázy..."
echo "   Zdroj: $LOCAL_DB"

# Vytvor dočasný export
TEMP_DIR="./temp-pages-export-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$TEMP_DIR"

# Export len kolekcie pages
if command -v mongodump &> /dev/null; then
  mongodump --uri="$LOCAL_DB" --collection=pages --out="$TEMP_DIR"

  if [ $? -eq 0 ]; then
    echo "✅ Export dokončený"
    echo ""
    echo "⚠️  POZOR: Tento import prepíše stránky v produkčnej databáze!"
    read -p "Pokračovať? (yes/no): " confirm

    if [ "$confirm" = "yes" ]; then
      echo ""
      echo "📥 Importujem stránky do produkčnej databázy..."
      echo "   Cieľ: $PROD_DB"

      # Nájdite správnu cestu k exportu
      DB_NAME=$(echo "$LOCAL_DB" | sed -n 's/.*\/\([^?]*\).*/\1/p')
      EXPORT_PATH="$TEMP_DIR/$DB_NAME/pages.bson"

      if [ -f "$EXPORT_PATH" ]; then
        mongorestore --uri="$PROD_DB" --collection=pages --drop "$EXPORT_PATH"

        if [ $? -eq 0 ]; then
          echo "✅ Import dokončený!"
        else
          echo "❌ Chyba pri importe"
          exit 1
        fi
      else
        echo "❌ Exportovaný súbor nebol nájdený: $EXPORT_PATH"
        exit 1
      fi
    else
      echo "❌ Import zrušený"
    fi

    # Vymaž dočasný export
    rm -rf "$TEMP_DIR"
  else
    echo "❌ Chyba pri exporte"
    exit 1
  fi
else
  echo "❌ mongodump nie je nainštalovaný"
  echo "💡 Nainštalujte MongoDB Database Tools alebo použite Docker:"
  echo ""
  echo "Docker príkaz:"
  echo "docker exec -it \$(docker ps -q -f name=mongo) mongodump --db=payload --collection=pages --out=/data/backup"
  exit 1
fi


