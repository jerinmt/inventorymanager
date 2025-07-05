const { Router } = require("express");
const deleteController = require("../controllers/deleteController");

const deleteRouter = Router();

//delete category
deleteRouter.get("/category", deleteController.deleteCategoryGet);
//delete item
deleteRouter.get("/item", deleteController.deleteItemGet);

module.exports = deleteRouter;