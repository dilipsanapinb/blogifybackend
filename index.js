require("dotenv").config();
const {sequelize} = require("./models");
const express = require("express");
const morgan = require("morgan");
const app = express();
const { userRouter } = require("./Routes/user.route");
const errorHandler = require("./Middlewares/errorhandler.middleware");
const postRouter = require("./Routes/Post.route");
const commentRouter = require("./Routes/Comment.route");
const cors = require("cors");

// Define the logger format 
const loggerFormat = '[:date[clf]] :method :url :status :response-time ms';
// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan(loggerFormat));


// Basic route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Blogify App:Express Yourself");
});

app.use(errorHandler)
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(5000, async () => {
      console.log(`Server is running on port: 5000`);
    });
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Something went wrong at connction to Db");
  });
