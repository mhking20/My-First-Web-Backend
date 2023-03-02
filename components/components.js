const model = require("../model/model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const postuser = async (req, res) => {
  try {
    const post = await model.create(req.body);
    console.log(post);
    const token = jwt.sign(
      { UserID: post._id, username: post.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ msg: "User Created", token });
  } catch (error) {
    console.log(error);
  }
};

const getuser = async (req, res) => {
  try {
    const get = await model.find();
    res.status(200).json({ get });
  } catch (error) {
    console.log(error);
  }
};

const getsingleuser = async (req, res) => {
  try {
    const headertoken = req.headers.authorization;
    const token = headertoken.split(" ")[1];
    const decoded = jwt.decode(token);
    if (token) {
      const get = await model.findOne({ _id: decoded.UserID });
      res.status(200).json({ get });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateuser = async (req, res) => {
  try {
    const headerstoken = req.headers.authorization;
    const token = headerstoken.split(" ")[1];
    const decoded = jwt.decode(token);
    const update = await model.findOneAndUpdate(
      { _id: decoded.UserID },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ update });
  } catch (error) {
    console.log(error);
  }
};

const deleteuser = async (req, res) => {
  try {
    const headertoken = req.headers.authorization;
    const token = headertoken.split(" ")[1];
    const decoded = jwt.decode(token);
    const del = await model.findOneAndDelete({ _id: decoded.UserID });
    res.status(200).json({ del });
  } catch (error) {
    console.log(error);
  }
};

const loginuser = async (req, res) => {
  try {
    const data = req.query.data;
    const username = await model.findOne({ username: data.username });
    const password = await model.findOne({
      username: data.username,
      password: data.password,
    });
    const user = await model.findOne({
      username: data.username,
      password: data.password,
    });
    if (!username) {
      res.json({ msg: "Username Is Not Correct" });
    }
    if (!password) {
      res.json({ msg: "Password Is Not Correct" });
    }
    if (user) {
      const token = jwt.sign(
        { UserID: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ token });
    }
  } catch (error) {
    console.log(error);
  }
};

const auth = async (req, res) => {
  try {
    const headertoken = req.headers.authorization;
    const token = headertoken.split(" ")[1];
    console.log(token);
    const auth = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ auth });
    res.json({ auth });
  } catch (error) {
    res.json({ msg: "Unauthorized" });
    console.log(error);
  }
};

const reguser = async (req, res) => {
  try {
    const data = req.query.data;
    const email = await model.findOne({ email: data.email });
    const username = await model.findOne({ username: data.username });
    if(email){
      res.json({msg : "Email Already Exist"})
    }
    if(username){
      res.json({msg : "Username Already Exist"})
    }
    res.json({data})
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postuser,
  getuser,
  getsingleuser,
  updateuser,
  deleteuser,
  loginuser,
  auth,
  reguser,
};
