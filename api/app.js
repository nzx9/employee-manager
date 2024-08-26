const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const employeeRouter = require("./routes/employee");

const app = express();

app.use(logger("dev"));

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://140.238.209.143"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/api/v1/employee", employeeRouter);

module.exports = app;
