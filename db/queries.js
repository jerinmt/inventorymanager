const pool = require("./pool");

async function getCategories() {
    const { rows } = await pool.query("SELECT name FROM categories");
    return rows;
}

async function getAllProducts() {
  const { rows } = await pool.query(`SELECT name, quantity, price FROM all_items`);
  return rows;
}

async function getProducts(category) {
  const { rows } = await pool.query(`
    SELECT name, quantity, price 
    FROM ${category}
    INNER JOIN all_items
    ON product_name = all_items.name
    `);
  return rows;
}

async function createCategory(categoryName) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS ${categoryName} (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            product_name VARCHAR(30)
        )
    `);
    await pool.query(`INSERT INTO categories (name) VALUES ('${categoryName}') ON CONFLICT DO NOTHING`);
}

async function createItem(itemName, quantity, price) {
  await pool.query(`INSERT INTO all_items (name, quantity, price) VALUES ('${itemName}', '${quantity}', '${price}') ON CONFLICT DO NOTHING`);
}

async function deleteCategory(category) {
  await pool.query(`DROP TABLE ${category}`);
  await pool.query(`DELETE FROM categories WHERE name = '${category}'`);
}

async function clearItem(category, itemName) {
    await pool.query(`DELETE FROM ${category} WHERE product_name = '${itemName}'`);    
}

async function deleteItem(itemName) {
    const rows = await getCategories();
    await pool.query(`DELETE FROM all_items WHERE name = '${itemName}'`);
    if(rows.length) {
        for(let i=0; i < rows.length; i++) {
            await clearItem(rows[i].name, itemName);
        }
    }
}

async function addItems(category, item) {
    await pool.query(`INSERT INTO ${category} (product_name) VALUES ('${item}')`);
}

async function updateCategory(oldCategory, newCategory, productList) {
    if(productList) {
        if(!Array.isArray(productList)) {
            productList = [productList];
        }
        await pool.query(`DELETE FROM ${oldCategory}`);
        for(let i=0; i < productList.length; i++) {
            await addItems(oldCategory, productList[i]);
        }
    }
    if(newCategory) {
        await pool.query(`ALTER TABLE ${oldCategory} RENAME TO ${newCategory}`);
        await pool.query(`UPDATE categories SET name = '${newCategory}' WHERE name = '${oldCategory}'`);
    }
}

async function getItemDetails(itemName) {
    const { rows } = await pool.query(`SELECT quantity, price FROM all_items WHERE name = '${itemName}'`);
    return rows;
}

async function changeItem(category, oldName, newName) {
    await pool.query(`UPDATE ${category} SET product_name = '${newName}' WHERE product_name = '${oldName}'`);    
}

async function updateItem(oldName, newName, quantity, price) {
    if(quantity) {
        await pool.query(`UPDATE all_items SET quantity = ${quantity} WHERE name = '${oldName}'`);
    }
    if(price) {
        await pool.query(`UPDATE all_items SET price = ${price} WHERE name = '${oldName}'`);
    }
    if(newName) {
        const rows = await getCategories();
        for(let i=0; i < rows.length; i++) {
            await changeItem(rows[i].name, oldName, newName);
        }
        await pool.query(`UPDATE all_items SET name = '${newName}' WHERE name = '${oldName}'`);
    }
}

module.exports = {
  getProducts,
  getAllProducts,
  getCategories,
  createCategory,
  createItem,
  deleteCategory,
  deleteItem,
  updateCategory,
  getItemDetails,
  updateItem
};