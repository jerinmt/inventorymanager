const db = require("../db/queries");

async function newCategoryGet(req, res) {
  res.render("newCategoryForm");
}

async function newCategoryPost(req, res) {
  const categoryName = req.body.categoryName;
  const productList = req.body.productList;
  await db.createCategory(categoryName, productList);//query
  res.redirect("/");
}

async function newItemGet(req, res) {
  res.render("newItemForm");
}

async function newItemPost(req, res) {
  const itemName = req.body.itemName;
  const categoryList = req.body.categoryList;
  await db.createItem(itemName, categoryList);//query
  res.redirect("/");
}

module.exports = {
  newCategoryGet, newCategoryPost, newItemGet, newItemPost
};