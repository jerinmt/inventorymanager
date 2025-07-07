const db = require("../db/queries");

async function newCategoryGet(req, res) {
  const allCategories = await db.getCategories();
  res.render("newCategoryForm", {allCategories: allCategories});
}

async function newCategoryPost(req, res) {
  const categoryName = req.body.categoryName;
  await db.createCategory(categoryName);//query 2
  res.redirect("/");
}

async function newItemGet(req, res) {
  const allCategories = await db.getCategories();
  res.render("newItemForm", {allCategories: allCategories});
}

async function newItemPost(req, res) {
  const itemName = req.body.itemName;
  const quantity = req.body.quantity;
  const price = req.body.price;
  await db.createItem(itemName, quantity, price);//query 5
  res.redirect("/");
}

module.exports = {
  newCategoryGet, newCategoryPost, newItemGet, newItemPost
};