//imports
const express = require("express");
require("dotenv").config();
const indexRouter = require("./routes/indexRouter");
const createRouter = require("./routes/createRouter");
const updateRouter = require("./routes/updateRouter");
const deleteRouter = require("./routes/deleteRouter");
const authRouter = require("./routes/authRouter");
const path = require("node:path");

//initialisations
const app = express();
const assetsPath = path.join(__dirname, "public");


//static files
app.use(express.static(assetsPath));

//views setting
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//for form values
app.use(express.urlencoded({extended: true}));

//routing
app.use("/create", createRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);
app.use("/auth", authRouter);
app.use("/", indexRouter);

// Error handling
app.get("/{*splat}", (req, res) => {
  res.send("Error 404: Page not found");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

//activating port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Inventory manager app - listening on port ${PORT}!`);
});