const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

//home page get
indexRouter.get("/", indexController.homeGet);
//categorypages get
indexRouter.get("/products", indexController.productsGet);
indexRouter.get("/allProducts", indexController.allProductsGet);

module.exports = indexRouter;