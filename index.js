const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
app.use(cors({
  origin : "http://localhost:3000",
  methods : "POST"
}))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./routers/routers");
app.use("/api/v1", router);

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