#!/bin/bash

# Script na import MongoDB databázy
# Použitie: ./scripts/import-db.sh <cesta-k-exportu>

if [ -z "$1" ]; then
  echo "❌ Chýba cesta k exportu"
  echo "💡 Použitie: ./scripts/import-db.sh <cesta-k-exportu>"
  echo "   Príklad: ./scripts/import-db.sh ./database-exports/payload-export-20240101_120000"
  exit 1
fi

EXPORT_PATH="$1"
DB_NAME=$(grep -oP 'DATABASE_URI=.*?/\K[^?]*' .env 2>/dev/null || echo "payload")

if [ ! -d "$EXPORT_PATH" ]; then
  echo "❌ Export neexistuje: $EXPORT_PATH"
  exit 1
fi

echo "⚠️  POZOR: Tento import prepíše aktuálnu databázu!"
read -p "Pokračovať? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Import zrušený"
  exit 0
fi

echo "🔄 Importujem databázu: $DB_NAME"
echo "📁 Z exportu: $EXPORT_PATH"

# Import pomocou mongorestore
if command -v mongorestore &> /dev/null; then
  mongorestore --db="$DB_NAME" --drop "$EXPORT_PATH/$DB_NAME"
  echo "✅ Import dokončený!"
else
  echo "❌ mongorestore nie je nainštalovaný"
  echo "💡 Nainštalujte MongoDB Database Tools alebo použite Docker:"
  echo ""
  echo "Docker príkaz:"
  echo "docker cp $EXPORT_PATH \$(docker ps -q -f name=mongo):/data/backup"
  echo "docker exec -it \$(docker ps -q -f name=mongo) mongorestore --db=$DB_NAME --drop /data/backup/$DB_NAME"
fi


