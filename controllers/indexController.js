const db = require("../db/queries");

async function homeGet(req, res) {
    res.render("index");
}

async function productsGet(req, res) {
    const category = req.query.category;
    const products = await db.getProducts(category);//query 1
    res.render("products", { products: products });
}

module.exports = {
  homeGet, productsGet
};