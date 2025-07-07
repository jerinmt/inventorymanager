const pool = require("./pool");

async function getCategories() {
    const { rows } = await pool.query("SELECT name FROM categories");
    return rows;
}
async function getProducts(category) {
  const { rows } = await pool.query(`
    SELECT name, quantity, price 
    FROM $1
    INNER JOIN all_items
    ON product_name = all_items.name
    `, [category]);
  return rows;
}

async function createCategory(categoryName) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS $1 (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            product_name VARCHAR(30) NOT NULL UNIQUE
        )
    `, [categoryName]);
}

async function createItem(itemName, quantity, price) {
  await pool.query("INSERT INTO all_items (name, quantity, price) VALUES ($1, $2, $3)", [itemName, quantity, price]);
}

async function deleteCategory(category) {
  await pool.query("DROP TABLE $1", [category]);
}

async function clearItem(category, itemName) {
    await pool.query("DELETE FROM $1 WHERE product_name = $2", [category, itemName]);    
}

async function deleteItem(itemName) {
    const rows = getCategories();
    await pool.query("DELETE FROM all_items WHERE id = $1", [itemName]);
    rows.forEach(element => {
        clearItem(element, itemName);
    });    
}

async function addItems(category, item) {
    await pool.query("INSERT INTO $1 (product_name) VALUES ($2)", [category, item]);
}

async function updateCategory(oldCategory, newCategory, productList) {
    if(productList) {
        await pool.query("DELETE FROM $1", [oldCategory]);
        productList.forEach(element => {
            addItems(oldCategory, element);
        });
    }
    if(newCategory) {
        await pool.query("ALTER TABLE $1 RENAME TO $2", [oldCategory, newCategory]);
    }
}

async function getItemDetails(itemName) {
    const { rows } = await pool.query("SELECT quantity, price FROM all_items WHERE name = $1", [itemName]);
    return rows;
}

async function changeItem(category, oldName, newName) {
    await pool.query("UPDATE $1 SET product_name = $2 WHERE product_name = $3", [category, newName, oldName]);    
}

async function updateItem(oldName, newName, quantity, price) {
    if(quantity) {
        await pool.query("UPDATE all_items SET quantity = $1 WHERE name = $2" , [quantity, oldName]);
    }
    if(price) {
        await pool.query("UPDATE all_items SET price = $1 WHERE name = $2" , [price, oldName]);
    }
    if(newName) {
        const rows = getCategories();
        rows.forEach(element => {
            changeItem(element, oldName, newName);
        });
        await pool.query("UPDATE all_items SET name = $1 WHERE name = $2" , [newName, oldName]);
    }
}

module.exports = {
  getProducts,
  getCategories,
  createCategory,
  createItem,
  deleteCategory,
  deleteItem,
  updateCategory,
  getItemDetails,
  updateItem
};