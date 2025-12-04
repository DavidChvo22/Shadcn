#!/bin/bash

# Script na testovanie pripojenia k MongoDB Atlas
# Pomôže zistiť správny názov databázy

echo "🔍 Kontrola pripojenia k MongoDB Atlas"
echo ""

read -sp "Zadajte MongoDB Atlas heslo: " PASSWORD
echo ""
echo ""

# Skús rôzne názvy databáz
DB_NAMES=("shadcn-blocks" "payload" "shadcnblocks" "production")

for DB_NAME in "${DB_NAMES[@]}"; do
  echo "🔍 Skúšam databázu: $DB_NAME"

  ATLAS_URI="mongodb+srv://davidchvostal:${PASSWORD}@cluster0.dirww2k.mongodb.net/${DB_NAME}?appName=Cluster0"

  # Skús pripojenie
  RESULT=$(mongosh "$ATLAS_URI" --eval "db.getName()" --quiet 2>&1)

  if [ $? -eq 0 ] && [ ! -z "$RESULT" ]; then
    echo "✅ Úspešné pripojenie k databáze: $DB_NAME"
    echo ""

    # Zisti kolekcie
    echo "📋 Kolekcie v databáze:"
    mongosh "$ATLAS_URI" --eval "db.getCollectionNames()" --quiet

    # Zisti počet stránok
    PAGES_COUNT=$(mongosh "$ATLAS_URI" --eval "db.pages.countDocuments()" --quiet 2>/dev/null)
    echo ""
    echo "📄 Počet stránok v kolekcii 'pages': $PAGES_COUNT"

    echo ""
    echo "✅ Použite tento connection string pre import:"
    echo "   $ATLAS_URI"
    exit 0
  else
    echo "   ❌ Databáza '$DB_NAME' neexistuje alebo nie je dostupná"
  fi
  echo ""
done

echo "❌ Nepodarilo sa pripojiť k žiadnej databáze"
echo "💡 Skontrolujte:"
echo "   - Heslo je správne"
echo "   - Máte prístup k clusteru"
echo "   - Názov databázy v Atlas dashboarde"


