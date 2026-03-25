import { sql } from '@vercel/postgres'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function fixEventsSchemaFinal() {
  try {
    console.log('Starting final Events table schema fix...\n')
    
    // 1. Check and fix full_description column
    console.log('1. Checking full_description column type...')
    const checkFullDesc = await sql`
      SELECT data_type 
      FROM information_schema.columns 
      WHERE table_name = 'events' 
      AND column_name = 'full_description';
    `
    
    if (checkFullDesc.rows.length > 0 && checkFullDesc.rows[0].data_type !== 'jsonb') {
      console.log('   Converting full_description to jsonb...')
      
      // Convert text to jsonb with proper structure
      await sql`
        ALTER TABLE events 
        ALTER COLUMN full_description TYPE jsonb 
        USING CASE 
          WHEN full_description IS NULL OR full_description = '' THEN NULL
          ELSE jsonb_build_object(
            'root', jsonb_build_object(
              'type', 'root',
              'children', jsonb_build_array(
                jsonb_build_object(
                  'type', 'paragraph',
                  'children', jsonb_build_array(
                    jsonb_build_object('text', full_description, 'type', 'text')
                  )
                )
              ),
              'direction', 'ltr',
              'format', '',
              'indent', 0,
              'version', 1
            )
          )
        END;
      `
      console.log('   ✓ full_description converted to jsonb\n')
    } else {
      console.log('   ✓ full_description already jsonb or does not exist\n')
    }
    
    // 2. Check and fix summary column
    console.log('2. Checking summary column type...')
    const checkSummary = await sql`
      SELECT data_type 
      FROM information_schema.columns 
      WHERE table_name = 'events' 
      AND column_name = 'summary';
    `
    
    if (checkSummary.rows.length > 0 && checkSummary.rows[0].data_type !== 'text') {
      console.log('   Converting summary to text...')
      await sql`
        ALTER TABLE events 
        ALTER COLUMN summary TYPE text;
      `
      console.log('   ✓ summary converted to text\n')
    } else {
      console.log('   ✓ summary already correct type\n')
    }
    
    console.log('✅ All Events table schema issues fixed successfully!')
    console.log('\nRestart the dev server to apply changes.')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
  
  process.exit(0)
}

fixEventsSchemaFinal()
