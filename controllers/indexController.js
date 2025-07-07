const db = require("../db/queries");

async function homeGet(req, res) {
  const allCategories = await db.getCategories();  
  res.render("index", {allCategories: allCategories});
}

async function productsGet(req, res) {
    const category = req.query.category;
    const products = await db.getProducts(category);//query 1
    const allCategories = await db.getCategories();
    res.render("products", { products: products, allCategories: allCategories });
}

module.exports = {
  homeGet, productsGet
};