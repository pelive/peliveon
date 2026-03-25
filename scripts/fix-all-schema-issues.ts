import { sql } from '@vercel/postgres'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function fixAllSchemaIssues() {
  try {
    console.log('Starting comprehensive database schema fix...\n')
    
    // 1. Create the enum type for featured field
    console.log('1. Creating enum_events_featured type...')
    await sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_events_featured') THEN
          CREATE TYPE enum_events_featured AS ENUM ('none', 'featured');
        END IF;
      END $$;
    `
    console.log('   ✓ Enum type ready\n')
    
    // 2. Drop existing default constraint
    console.log('2. Dropping existing default constraint...')
    await sql`
      ALTER TABLE events 
      ALTER COLUMN featured DROP DEFAULT;
    `
    console.log('   ✓ Default constraint dropped\n')
    
    // 3. Ensure featured column is correct type
    console.log('3. Converting featured column to enum type...')
    await sql`
      ALTER TABLE events 
      ALTER COLUMN featured TYPE enum_events_featured 
      USING featured::enum_events_featured;
    `
    console.log('   ✓ Featured column converted\n')
    
    // 4. Set default value for featured
    console.log('4. Setting default value for featured...')
    await sql`
      ALTER TABLE events 
      ALTER COLUMN featured SET DEFAULT 'none'::enum_events_featured;
    `
    console.log('   ✓ Default value set\n')
    
    // 4. Clean up old FrontPageComponents enum types if they exist
    console.log('4. Cleaning up old enum types...')
    const oldEnums = [
      'enum_front_page_components_component_type',
      'enum_front_page_components_content_section_alignment',
      'enum_front_page_components_cta_content_background_color',
      'enum_front_page_components_media_content_layout'
    ]
    
    for (const enumName of oldEnums) {
      try {
        await sql.query(`DROP TYPE IF EXISTS "${enumName}" CASCADE;`)
      } catch (e) {
        // Ignore errors if enum doesn't exist
      }
    }
    console.log('   ✓ Old enum types cleaned up\n')
    
    console.log('✅ All database schema issues fixed successfully!')
    console.log('\nYou can now start the dev server with: npm run dev')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
  
  process.exit(0)
}

fixAllSchemaIssues()
