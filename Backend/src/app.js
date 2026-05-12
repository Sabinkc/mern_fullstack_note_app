const express = require("express");
const AuthRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const CrudRoutes = require("./routes/crud.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH"], // Allow specific methods
    credentials: true,
  }),
);

app.use("/api/auth", AuthRoutes);
app.use("/api/notes", CrudRoutes);

module.exports = app;
