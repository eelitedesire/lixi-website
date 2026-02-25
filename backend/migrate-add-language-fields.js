// backend/migrate-add-language-fields.js
// Run this to add language fields to existing database records

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

const TABLES = [
  'lixi-products',
  'lixi-blog',
  'lixi-hero',
  'lixi-celltech',
  'lixi-whatwedo',
  'lixi-partners',
  'lixi-solutions',
  'lixi-services',
  'lixi-about',
  'lixi-footer'
];

const TEXT_FIELDS = {
  'lixi-products': ['name', 'description', 'tagline', 'features'],
  'lixi-blog': ['title', 'content', 'excerpt'],
  'lixi-hero': ['badge', 'title', 'titleHighlight', 'description', 'primaryButtonText', 'secondaryButtonText'],
  'lixi-celltech': ['badge', 'title', 'description', 'cardLabel', 'cardTitle', 'cardSubtitle'],
  'lixi-whatwedo': ['title', 'description'],
  'lixi-partners': ['name', 'description'],
  'lixi-solutions': ['title', 'subtitle', 'description'],
  'lixi-services': ['name', 'description', 'features'],
  'lixi-about': ['title', 'content'],
  'lixi-footer': ['title', 'description']
};

async function migrateTable(tableName) {
  console.log(`\nMigrating ${tableName}...`);
  
  // Scan all items
  const result = await dynamoDB.scan({ TableName: tableName }).promise();
  const items = result.Items;
  
  console.log(`Found ${items.length} items`);
  
  const fields = TEXT_FIELDS[tableName] || [];
  
  for (const item of items) {
    const updates = {};
    
    // For each text field, create language versions
    fields.forEach(field => {
      if (item[field]) {
        // Copy English value to all languages (admin will translate later)
        updates[`${field}_en`] = item[field];
        updates[`${field}_fr`] = item[field]; // TODO: Translate
        updates[`${field}_es`] = item[field]; // TODO: Translate
        updates[`${field}_nl`] = item[field]; // TODO: Translate
      }
    });
    
    if (Object.keys(updates).length > 0) {
      await dynamoDB.update({
        TableName: tableName,
        Key: { id: item.id },
        UpdateExpression: `SET ${Object.keys(updates).map((k, i) => `#field${i} = :val${i}`).join(', ')}`,
        ExpressionAttributeNames: Object.keys(updates).reduce((acc, k, i) => {
          acc[`#field${i}`] = k;
          return acc;
        }, {}),
        ExpressionAttributeValues: Object.keys(updates).reduce((acc, k, i) => {
          acc[`:val${i}`] = updates[k];
          return acc;
        }, {})
      }).promise();
      
      console.log(`✓ Updated ${item.id}`);
    }
  }
  
  console.log(`✓ ${tableName} migration complete`);
}

async function main() {
  console.log('Starting database migration for multilingual support...\n');
  
  for (const table of TABLES) {
    try {
      await migrateTable(table);
    } catch (error) {
      console.error(`✗ Error migrating ${table}:`, error.message);
    }
  }
  
  console.log('\n✅ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Update admin forms to edit language-specific fields');
  console.log('2. Translate content in admin panel');
  console.log('3. Or use Google Translate API to auto-translate');
}

main().catch(console.error);
