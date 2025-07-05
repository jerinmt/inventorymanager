const db = require("../db/queries");

async function updateCategoryGet(req, res) {
  const categoryName = req.query.categoryName;
  const productList = req.query.productList; 
  res.render("newCategoryForm", {categoryName: categoryName, productList: productList});
}

async function updateCategoryPost(req, res) {
  const categoryName = req.body.categoryName;
  const productList = req.body.productList;
  await db.updateCategory(categoryName, productList);//query
  res.redirect("/");
}

async function updateItemGet(req, res) {
  const itemName = req.query.itemName;
  const categoryList = req.query.categoryList;
  res.render("newItemForm", {itemName: itemName, categoryList: categoryList});
}

async function updateItemPost(req, res) {
  const itemName = req.body.itemName;
  const categoryList = req.body.categoryList;
  await db.updateItem(itemName, categoryList);//query
  res.redirect("/");
}

module.exports = {
  updateCategoryGet, updateCategoryPost, updateItemGet, updateItemPost
};