const { Router } = require("express");
const createController = require("../controllers/createController");

const createRouter = Router();

//new category get
createRouter.get("/category", createController.newCategoryGet);
//new category post
createRouter.post("/category", createController.newCategoryPost);
//new item get
createRouter.get("/item", createController.newItemGet);
//new item post
createRouter.post("/item", createController.newItemPost);

module.exports = createRouter;