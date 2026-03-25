import { sql } from '@vercel/postgres'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function fixNullDescriptions() {
  try {
    console.log('Fixing NULL full_description values...\n')
    
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
    
    // Update NULL values
    const result = await sql`
      UPDATE events 
      SET full_description = ${JSON.stringify(defaultRichText)}::jsonb
      WHERE full_description IS NULL;
    `
    
    console.log(`✓ Updated ${result.rowCount} events with default description\n`)
    
    // Also fix NULL summary values
    const summaryResult = await sql`
      UPDATE events 
      SET summary = 'No summary provided.'
      WHERE summary IS NULL OR summary = '';
    `
    
    console.log(`✓ Updated ${summaryResult.rowCount} events with default summary\n`)
    
    console.log('✅ All NULL values fixed successfully!')
    console.log('\nRestart the dev server to apply changes.')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
  
  process.exit(0)
}

fixNullDescriptions()
