import { sql } from '@vercel/postgres'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function fixAllNullEvents() {
  try {
    console.log('Fixing all NULL values in Events table...\n')
    
    // Default empty Lexical rich text structure
    const defaultRichText = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'No description provided.',
                type: 'text'
              }
            ]
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    }
    
    // 1. Fix NULL event_date values (set to a default date)
    console.log('1. Fixing NULL event_date values...')
    const dateResult = await sql`
      UPDATE events 
      SET event_date = NOW()
      WHERE event_date IS NULL;
    `
    console.log(`   ✓ Updated ${dateResult.rowCount} events with default date\n`)
    
    // 2. Fix NULL full_description values
    console.log('2. Fixing NULL full_description values...')
    const descResult = await sql`
      UPDATE events 
      SET full_description = ${JSON.stringify(defaultRichText)}::jsonb
      WHERE full_description IS NULL;
    `
    console.log(`   ✓ Updated ${descResult.rowCount} events with default description\n`)
    
    // 3. Fix NULL summary values
    console.log('3. Fixing NULL summary values...')
    const summaryResult = await sql`
      UPDATE events 
      SET summary = 'No summary provided.'
      WHERE summary IS NULL OR summary = '';
    `
    console.log(`   ✓ Updated ${summaryResult.rowCount} events with default summary\n`)
    
    // 4. Fix NULL title values
    console.log('4. Fixing NULL title values...')
    const titleResult = await sql`
      UPDATE events 
      SET title = 'Untitled Event'
      WHERE title IS NULL OR title = '';
    `
    console.log(`   ✓ Updated ${titleResult.rowCount} events with default title\n`)
    
    // 5. Fix NULL location values
    console.log('5. Fixing NULL location values...')
    const locationResult = await sql`
      UPDATE events 
      SET location = 'TBD'
      WHERE location IS NULL OR location = '';
    `
    console.log(`   ✓ Updated ${locationResult.rowCount} events with default location\n`)
    
    console.log('✅ All NULL values fixed successfully!')
    console.log('\nRestart the dev server to apply changes.')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
  
  process.exit(0)
}

fixAllNullEvents()
