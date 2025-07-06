const db = require("../db/queries");

async function deleteCategoryGet(req, res) {
  const categoryName = req.query.categoryName;
  await db.deleteCategory(categoryName);//query 4
  res.redirect("/");
}

async function deleteItemGet(req, res) {
  const itemName = req.query.itemName;
  await db.deleteItem(itemName);//query 8
  res.redirect("/");
}

module.exports = {
  deleteCategoryGet, deleteItemGet
};