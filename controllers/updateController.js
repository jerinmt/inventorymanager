const db = require("../db/queries");

async function updateCategoryGet(req, res) {
  const category = req.query.category;
  const productList = await db.getProducts(category);
  const allProducts = await db.getProducts("all_items");
  res.render("editCategoryForm", {category: category, productList: productList, allProducts: allProducts});
}

async function updateCategoryPost(req, res) {
  const oldCategory = req.body.oldCategory;
  const newCategory = req.body.newCategory;
  const productList = req.body.productList;
  await db.updateCategory(oldCategory, newCategory, productList);//query 3
  res.redirect("/");
}

async function updateItemGet(req, res) {
  const itemName = req.query.itemName;
  const itemDetails = await db.getItemDetails(itemName);//query 6
  res.render("editItemForm", {itemName: itemName, itemDetails: itemDetails});
}

async function updateItemPost(req, res) {
  const oldName = req.body.oldName;
  const newName = req.body.newName;
  const quantity = req.body.quantity;
  const price = req.body.price;
  await db.updateItem(oldName, newName, quantity, price);//query 7
  res.redirect("/");
}

module.exports = {
  updateCategoryGet, updateCategoryPost, updateItemGet, updateItemPost
};