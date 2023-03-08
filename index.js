const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Router = require("./routers/routers");
const Task_Manager_router = require("./routers/task_manager_router")
app.use("/api/v1/user", Router);
app.use("/api/v1/task", Task_Manager_router);


app.use("/", (req, res) => {
  res.send("Server Running");
});

setInterval(function() {
    app.get("https://mian-first-web.netlify.app");
}, 3000); // every 5 minutes (300000)

const connectDB = require("./connectDB/connectDB");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server Running");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
