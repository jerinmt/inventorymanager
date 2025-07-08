const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

//Sending password entry form
authRouter.get("{*splat}", authController.authenticateGet);
//authenticating password
authRouter.post("/", authController.authenticatePost);

module.exports = authRouter;