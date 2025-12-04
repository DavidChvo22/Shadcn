#!/usr/bin/env tsx
/**
 * Script na upload media súborov do produkčnej Payload aplikácie
 *
 * Použitie:
 * pnpm tsx scripts/upload-media-to-production.ts --api-url="https://tvoja-domena.com/api" --api-key="tvoj-api-key"
 */

import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { createReadStream } from 'fs'

const MEDIA_DIR = './public/media'
const API_URL = process.argv.find(arg => arg.startsWith('--api-url='))?.split('=')[1] || process.env.PAYLOAD_API_URL
const API_KEY = process.argv.find(arg => arg.startsWith('--api-key='))?.split('=')[1] || process.env.PAYLOAD_API_KEY

async function uploadMediaFile(filePath: string, relativePath: string) {
  const stats = await stat(filePath)
  const fileName = relativePath.split('/').pop() || relativePath

  console.log(`📤 Uploadujem: ${relativePath} (${(stats.size / 1024).toFixed(2)} KB)`)

  try {
    const formData = new FormData()
    const fileStream = createReadStream(filePath)
    const blob = await new Promise<Blob>((resolve, reject) => {
      const chunks: Buffer[] = []
      fileStream.on('data', (chunk: Buffer | string) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      })
      fileStream.on('end', () => resolve(new Blob(chunks)))
      fileStream.on('error', reject)
    })

    formData.append('file', blob, fileName)

    const response = await fetch(`${API_URL}/media`, {
      method: 'POST',
      headers: {
        ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`HTTP ${response.status}: ${error}`)
    }

    const result = await response.json()
    console.log(`✅ Nahrané: ${fileName}`)
    return result
  } catch (error) {
    console.error(`❌ Chyba pri ${fileName}:`, error instanceof Error ? error.message : error)
    throw error
  }
}

async function getAllMediaFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = fullPath.replace(baseDir + '/', '')

    if (entry.isDirectory()) {
      const subFiles = await getAllMediaFiles(fullPath, baseDir)
      files.push(...subFiles)
    } else {
      files.push(fullPath)
    }
  }

  return files
}

async function main() {
  if (!API_URL) {
    console.error('❌ Chýba API URL')
    console.log('💡 Použitie: pnpm tsx scripts/upload-media-to-production.ts --api-url="https://tvoja-domena.com/api"')
    process.exit(1)
  }

  console.log('📦 Upload media súborov do produkcie')
  console.log(`   API URL: ${API_URL}`)
  console.log('')

  try {
    const files = await getAllMediaFiles(MEDIA_DIR)
    console.log(`✅ Našiel som ${files.length} súborov`)
    console.log('')

    let uploaded = 0
    let errors = 0

    for (const filePath of files) {
      const relativePath = filePath.replace(MEDIA_DIR + '/', '')
      try {
        await uploadMediaFile(filePath, relativePath)
        uploaded++
      } catch {
        errors++
      }
    }

    console.log('')
    console.log('✅ Upload dokončený!')
    console.log(`   ➕ Nahrané: ${uploaded}`)
    console.log(`   ❌ Chyby: ${errors}`)
  } catch (error) {
    console.error('❌ Chyba:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()


