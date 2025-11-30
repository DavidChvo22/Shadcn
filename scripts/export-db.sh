#!/bin/bash

# Script na export MongoDB databázy
# Použitie: ./scripts/export-db.sh

# Nájdite názov databázy z .env súboru alebo použite default
DB_NAME=$(grep -oP 'DATABASE_URI=.*?/\K[^?]*' .env 2>/dev/null || echo "payload")

# Vytvorte priečinok pre exporty
EXPORT_DIR="./database-exports"
mkdir -p "$EXPORT_DIR"

# Názov súboru s dátumom
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
EXPORT_FILE="$EXPORT_DIR/payload-export-$TIMESTAMP"

echo "🔄 Exportujem databázu: $DB_NAME"
echo "📁 Export bude uložený do: $EXPORT_FILE"

# Export pomocou mongodump
if command -v mongodump &> /dev/null; then
  mongodump --db="$DB_NAME" --out="$EXPORT_FILE"
  echo "✅ Export dokončený!"
  echo "📦 Exportovaný súbor: $EXPORT_FILE"
else
  echo "❌ mongodump nie je nainštalovaný"
  echo "💡 Nainštalujte MongoDB Database Tools alebo použite Docker:"
  echo ""
  echo "Docker príkaz:"
  echo "docker exec -it \$(docker ps -q -f name=mongo) mongodump --db=$DB_NAME --out=/data/backup"
  echo ""
  echo "Potom skopírujte súbory:"
  echo "docker cp \$(docker ps -q -f name=mongo):/data/backup $EXPORT_FILE"
fi


