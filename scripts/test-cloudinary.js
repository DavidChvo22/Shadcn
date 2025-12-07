// Test script na kontrolu Cloudinary súborov
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnvzpot8r',
  api_key: process.env.CLOUDINARY_API_KEY || '785654522573849',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'EHgFsXevryNNw17zyJrh_YY_Zwg',
})

async function testCloudinary() {
  try {
    console.log('🔍 Hľadám súbory v Cloudinary...')
    console.log('Cloud name:', cloudinary.config().cloud_name)

    // Získaj všetky súbory v priečinku media
    const result = await cloudinary.search.expression('folder:media').max_results(10).execute()

    console.log('\n📁 Nájdené súbory v priečinku "media":')
    console.log('Počet:', result.total_count)

    if (result.resources && result.resources.length > 0) {
      result.resources.forEach((resource, index) => {
        console.log(`\n${index + 1}. ${resource.public_id}`)
        console.log(`   URL: ${resource.secure_url}`)
        console.log(`   Formát: ${resource.format}`)
        console.log(`   Veľkosť: ${resource.bytes} bytes`)
        console.log(`   Vytvorený: ${resource.created_at}`)
      })
    } else {
      console.log('❌ Žiadne súbory sa nenašli v priečinku "media"')
    }

    // Skús nájsť všetky súbory (bez priečinka)
    console.log('\n🔍 Hľadám všetky súbory v Cloudinary...')
    const allResult = await cloudinary.search.expression('*').max_results(10).execute()

    console.log('Počet všetkých súborov:', allResult.total_count)

    if (allResult.resources && allResult.resources.length > 0) {
      console.log('\n📁 Všetky súbory:')
      allResult.resources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.public_id}`)
      })
    }
  } catch (error) {
    console.error('❌ Chyba:', error.message)
    console.error(error)
  }
}

testCloudinary()
