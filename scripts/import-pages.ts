#!/usr/bin/env tsx
/**
 * Script na import stránok z lokálnej MongoDB do produkčnej MongoDB
 *
 * Použitie:
 * 1. Export stránok z lokálnej DB:
 *    pnpm tsx scripts/import-pages.ts export --source-uri="mongodb://localhost:27017/payload" --output="./pages-export.json"
 *
 * 2. Import stránok do produkčnej DB:
 *    pnpm tsx scripts/import-pages.ts import --target-uri="mongodb://production-uri" --input="./pages-export.json"
 *
 * 3. Import všetkých stránok z lokálnej do produkčnej (one-step):
 *    pnpm tsx scripts/import-pages.ts sync --source-uri="mongodb://localhost:27017/payload" --target-uri="mongodb://production-uri"
 */

import { MongoClient } from 'mongodb'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

type Command = 'export' | 'import' | 'sync'

interface Options {
  command: Command
  sourceUri?: string
  targetUri?: string
  input?: string
  output?: string
  collection?: string
  locale?: string
}

async function exportPages(sourceUri: string, outputPath: string, locale?: string) {
  console.log('🔄 Pripojujem sa k zdrojovej databáze...')
  const client = new MongoClient(sourceUri)

  try {
    await client.connect()
    const db = client.db()
    const collection = db.collection('pages')

    console.log('📥 Exportujem stránky...')
    const query = locale ? { 'locale': locale } : {}
    const pages = await collection.find(query).toArray()

    // Odstráň MongoDB interné polia
    const cleanPages = pages.map(page => {
      const { _id, ...rest } = page
      return rest
    })

    const outputFile = resolve(outputPath)
    writeFileSync(outputFile, JSON.stringify(cleanPages, null, 2), 'utf-8')

    console.log(`✅ Exportované ${cleanPages.length} stránok do ${outputFile}`)
    return cleanPages
  } finally {
    await client.close()
  }
}

async function importPages(targetUri: string, inputPath: string) {
  console.log('🔄 Pripojujem sa k cieľovej databáze...')
  const client = new MongoClient(targetUri)

  try {
    await client.connect()
    const db = client.db()
    const collection = db.collection('pages')

    console.log('📤 Načítavam stránky zo súboru...')
    const inputFile = resolve(inputPath)
    const fileContent = readFileSync(inputFile, 'utf-8')
    const pages = JSON.parse(fileContent)

    if (!Array.isArray(pages)) {
      throw new Error('Súbor musí obsahovať pole stránok')
    }

    console.log(`📥 Importujem ${pages.length} stránok...`)

    let imported = 0
    let updated = 0
    let errors = 0

    for (const page of pages) {
      try {
        // Skús nájsť existujúcu stránku podľa slug a locale
        const existing = await collection.findOne({
          slug: page.slug,
          locale: page.locale || 'sk'
        })

        if (existing) {
          // Aktualizuj existujúcu stránku
          await collection.updateOne(
            { _id: existing._id },
            { $set: page }
          )
          updated++
          console.log(`  ✏️  Aktualizovaná: ${page.title} (${page.slug})`)
        } else {
          // Vytvor novú stránku
          await collection.insertOne(page)
          imported++
          console.log(`  ➕ Vytvorená: ${page.title} (${page.slug})`)
        }
      } catch (error) {
        errors++
        console.error(`  ❌ Chyba pri ${page.slug}:`, error instanceof Error ? error.message : error)
      }
    }

    console.log('\n✅ Import dokončený!')
    console.log(`   ➕ Nové stránky: ${imported}`)
    console.log(`   ✏️  Aktualizované: ${updated}`)
    console.log(`   ❌ Chyby: ${errors}`)
  } finally {
    await client.close()
  }
}

async function syncPages(sourceUri: string, targetUri: string, locale?: string) {
  console.log('🔄 Synchronizujem stránky...\n')

  // Dočasný súbor
  const tempFile = './temp-pages-export.json'

  try {
    // Export z lokálnej
    await exportPages(sourceUri, tempFile, locale)

    // Import do produkčnej
    await importPages(targetUri, tempFile)
  } finally {
    // Vymaž dočasný súbor
    try {
      const fs = await import('fs')
      fs.unlinkSync(tempFile)
    } catch {
      // Ignoruj ak súbor neexistuje
    }
  }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
📖 Použitie:

Export stránok:
  pnpm tsx scripts/import-pages.ts export --source-uri="mongodb://localhost:27017/payload" --output="./pages-export.json"

Import stránok:
  pnpm tsx scripts/import-pages.ts import --target-uri="mongodb://production-uri" --input="./pages-export.json"

Synchronizácia (export + import):
  pnpm tsx scripts/import-pages.ts sync --source-uri="mongodb://localhost:27017/payload" --target-uri="mongodb://production-uri"

Možnosti:
  --locale="sk"     - Export/import len pre konkrétny locale
  --collection="pages" - Názov kolekcie (default: pages)
    `)
    process.exit(0)
  }

  const command = args[0] as Command

  if (!['export', 'import', 'sync'].includes(command)) {
    console.error(`❌ Neplatný príkaz: ${command}`)
    process.exit(1)
  }

  // Parsuj argumenty
  const options: Options = {
    command,
    collection: 'pages',
  }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--source-uri=')) {
      options.sourceUri = arg.split('=')[1]
    } else if (arg.startsWith('--target-uri=')) {
      options.targetUri = arg.split('=')[1]
    } else if (arg.startsWith('--input=')) {
      options.input = arg.split('=')[1]
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1]
    } else if (arg.startsWith('--locale=')) {
      options.locale = arg.split('=')[1]
    } else if (arg.startsWith('--collection=')) {
      options.collection = arg.split('=')[1]
    }
  }

  try {
    switch (command) {
      case 'export':
        if (!options.sourceUri || !options.output) {
          console.error('❌ Chýbajú požadované parametre: --source-uri a --output')
          process.exit(1)
        }
        await exportPages(options.sourceUri, options.output, options.locale)
        break

      case 'import':
        if (!options.targetUri || !options.input) {
          console.error('❌ Chýbajú požadované parametre: --target-uri a --input')
          process.exit(1)
        }
        await importPages(options.targetUri, options.input)
        break

      case 'sync':
        if (!options.sourceUri || !options.targetUri) {
          console.error('❌ Chýbajú požadované parametre: --source-uri a --target-uri')
          process.exit(1)
        }
        await syncPages(options.sourceUri, options.targetUri, options.locale)
        break
    }
  } catch (error) {
    console.error('❌ Chyba:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()


