const { Router } = require("express");
const updateController = require("../controllers/updateController");

const updateRouter = Router();

//update category get
updateRouter.get("/category", updateController.updateCategoryGet);
//update category post
updateRouter.post("/category", updateController.updateCategoryPost);
//update item get
updateRouter.get("/item", updateController.updateItemGet);
//update item post
updateRouter.post("/item", updateController.updateItemPost);

module.exports = updateRouter;