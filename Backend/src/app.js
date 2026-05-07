const express = require("express");
const AuthRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const CrudRoutes = require("./routes/crud.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/notes", CrudRoutes);

module.exports = app;
