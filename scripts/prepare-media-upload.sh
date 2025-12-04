#!/bin/bash

# Script na pripravenie media súborov na upload
# Vytvorí zip archív s media súbormi

echo "📦 Pripravujem media súbory na upload..."
echo ""

MEDIA_DIR="./public/media"
OUTPUT_ZIP="./media-upload-$(date +%Y%m%d_%H%M%S).zip"

if [ ! -d "$MEDIA_DIR" ]; then
  echo "❌ Priečinok $MEDIA_DIR neexistuje"
  exit 1
fi

# Zisti počet súborov
FILE_COUNT=$(find "$MEDIA_DIR" -type f | wc -l | tr -d ' ')

if [ "$FILE_COUNT" -eq 0 ]; then
  echo "❌ V priečinku $MEDIA_DIR nie sú žiadne súbory"
  exit 1
fi

echo "✅ Našiel som $FILE_COUNT media súborov"
echo "📦 Vytváram zip archív..."

# Vytvor zip archív
cd public
zip -r "../$OUTPUT_ZIP" media/ > /dev/null 2>&1
cd ..

if [ -f "$OUTPUT_ZIP" ]; then
  SIZE=$(du -h "$OUTPUT_ZIP" | cut -f1)
  echo "✅ Zip archív vytvorený: $OUTPUT_ZIP ($SIZE)"
  echo ""
  echo "📤 Teraz môžeš:"
  echo "   1. Nahrať $OUTPUT_ZIP na produkčný server"
  echo "   2. Rozbaliť ho do priečinka public/media/"
  echo ""
  echo "   Príklad na serveri:"
  echo "   unzip $OUTPUT_ZIP -d /cesta/k/projektu/public/"
else
  echo "❌ Chyba pri vytváraní zip archívu"
  exit 1
fi


