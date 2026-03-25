import { sql } from '@vercel/postgres'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function fixEventDate() {
  try {
    // Check current column state
    const checkEventDate = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'events' 
      AND column_name = 'eventDate';
    `
    
    const checkOldEventDate = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'events' 
      AND column_name = 'event_date';
    `
    
    // If eventDate exists, rename it back to event_date for Payload
    if (checkEventDate.rows.length > 0) {
      console.log('Found eventDate column, renaming to event_date for Payload...')
      
      await sql`
        ALTER TABLE events 
        RENAME COLUMN "eventDate" TO event_date;
      `
      
      console.log('✓ Successfully renamed eventDate to event_date')
    } else if (checkOldEventDate.rows.length > 0) {
      console.log('✓ Column event_date already exists')
    } else {
      console.log('⚠ No event date column found, Payload will create it')
    }
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
  
  process.exit(0)
}

fixEventDate()
