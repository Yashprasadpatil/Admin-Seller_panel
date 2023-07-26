const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Serve the frontend
app.use(express.static('public'));

// Save product to the database
app.post('/addProduct', (req, res) => {
  const { fname, price, category } = req.body;
  // Here you can perform validation or additional processing if needed

  // Save the product to the database
  database.addProductToDB({ fname, price, category }, (error, result) => {
    if (error) {
      console.error('Error adding product to database:', error);
      return res.status(500).json({ error: 'Error adding product to database' });
    }

    return res.json({ message: 'Product added to database successfully' });
  });
});

// Delete product from the database
app.delete('/deleteProduct/:id', (req, res) => {
  const productId = req.params.id;

  // Delete the product from the database
  database.deleteProductFromDB(productId, (error, result) => {
    if (error) {
      console.error('Error deleting product from database:', error);
      return res.status(500).json({ error: 'Error deleting product from database' });
    }

    return res.json({ message: 'Product deleted from database successfully' });
  });
});

// Update product in the database
app.put('/updateProduct/:id', (req, res) => {
  const productId = req.params.id;
  const { fname, price, category } = req.body;

  // Update the product in the database
  database.updateProductInDB({ id: productId, fname, price, category }, (error, result) => {
    if (error) {
      console.error('Error updating product in database:', error);
      return res.status(500).json({ error: 'Error updating product in database' });
    }

    return res.json({ message: 'Product updated in database successfully' });
  });
});

// Get all products from the database
app.get('/getProducts', (req, res) => {
  database.getAllProductsFromDB((error, products) => {
    if (error) {
      console.error('Error retrieving products from database:', error);
      return res.status(500).json({ error: 'Error retrieving products from database' });
    }

    return res.json(products);
  });
});

app.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});