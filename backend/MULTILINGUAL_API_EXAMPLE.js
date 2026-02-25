// backend/server.js - Add language support to API endpoints

const express = require('express');
const app = express();

// Helper function to translate database object
function translateObject(obj, lang = 'en') {
  const translated = { ...obj };
  
  // Find all fields with language suffixes and map to base field
  Object.keys(obj).forEach(key => {
    if (key.match(/_(en|fr|es|nl)$/)) {
      const baseField = key.replace(/_(en|fr|es|nl)$/, '');
      const langField = `${baseField}_${lang}`;
      const fallbackField = `${baseField}_en`;
      
      // Set base field to translated value
      if (!translated[baseField]) {
        translated[baseField] = obj[langField] || obj[fallbackField] || obj[key];
      }
    }
  });
  
  return translated;
}

// Example: Products endpoint with language support
app.get('/api/products', async (req, res) => {
  const lang = req.query.lang || 'en';
  
  try {
    // Fetch from DynamoDB
    const products = await dynamoDB.scan({ TableName: 'lixi-products' }).promise();
    
    // Translate each product
    const translatedProducts = products.Items.map(product => 
      translateObject(product, lang)
    );
    
    res.json(translatedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example: Blog posts endpoint
app.get('/api/blog', async (req, res) => {
  const lang = req.query.lang || 'en';
  
  try {
    const posts = await dynamoDB.scan({ TableName: 'lixi-blog' }).promise();
    const translatedPosts = posts.Items.map(post => translateObject(post, lang));
    res.json(translatedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply to all content endpoints:
// - /api/hero?lang=fr
// - /api/celltech?lang=es
// - /api/whatwedo?lang=nl
// - /api/partners?lang=en
// - /api/solutions?lang=fr
// - /api/services?lang=es
// - /api/about?lang=nl
// - /api/footer?lang=en

module.exports = app;
