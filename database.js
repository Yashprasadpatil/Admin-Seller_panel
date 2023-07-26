//const mysql = require('mysql');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yash@7890', 
  database: 'admin-seller-panel', 


//   authPlugins: {
//     mysql_clear_password: () => () => Buffer.from('yash@7890')
//   }
  

});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
  }
});

// Function to add a product to the database
function addProductToDB(product, callback) {
    const { fname, price, category } = product;
    const query = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';
  
    connection.query(query, [fname, price, category], (error, result) => {
      if (error) {
        callback(error, null);
        console.log('Product is not added');
      } else {
        callback(null, result);
        console.log('Product is added');
      }
    });
  }

// Function to delete a product from the database
function deleteProductFromDB(productId, callback) {
  const query = `DELETE FROM products WHERE id = ?`;

  connection.query(query, [productId], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
}

// Function to update a product in the database
function updateProductInDB(product, callback) {
  const { id, fname, price, category } = product;
  const query = `UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?`;

  connection.query(query, [fname, price, category, id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
}

// Function to fetch all products from the database
function getAllProductsFromDB(callback) {
  const query = `SELECT * FROM products`;

  connection.query(query, (error, products) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, products);
    }
  });
}

module.exports = {
  addProductToDB,
  deleteProductFromDB,
  updateProductInDB,
  getAllProductsFromDB,
};