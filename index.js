const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
app.use(cors({
  origin : ["https://mian-first-web.netlify.app","https://mhking20-sturdy-umbrella-jvpqxjjx46gf5qrv.github.dev"],
  methods : ["GET" , "POST" , "DELETE" , "PATCH"]
}))

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
