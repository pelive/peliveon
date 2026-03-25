import { sql } from '@vercel/postgres'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function fixFeaturedColumn() {
  try {
    console.log('Checking featured column type...')
    
    // Check current column type
    const checkColumn = await sql`
      SELECT data_type 
      FROM information_schema.columns 
      WHERE table_name = 'events' 
      AND column_name = 'featured';
    `
    
    if (checkColumn.rows.length > 0 && checkColumn.rows[0].data_type === 'boolean') {
      console.log('Found boolean featured column, converting to text...')
      
      // Convert boolean to text values
      await sql`
        ALTER TABLE events 
        ALTER COLUMN featured TYPE text 
        USING CASE 
          WHEN featured = true THEN 'featured'
          ELSE 'none'
        END;
      `
      
      // Drop the enum type if it exists
      await sql`
        DROP TYPE IF EXISTS "enum_events_featured" CASCADE;
      `
      
      console.log('✓ Successfully converted featured column to text')
    } else {
      console.log('✓ Column already correct type or does not exist')
    }
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
  
  process.exit(0)
}

fixFeaturedColumn()
