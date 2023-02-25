const model = require("../model/model");
const jwt = require('jsonwebtoken')

const postuser = async (req, res) => {
  try {
    const post = await model.create(req.body);
    const token = jwt.sign({UserID : post._id , username : post.username} , "secret")
    res.status(201).json({msg : "User Created" , token});
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
    const token = headertoken.split(' ')[1]
    const decoded = jwt.decode(token)
    const get = await model.findOne({_id : decoded.UserID});
    res.status(200).json({ get });
  } catch (error) {
    console.log(error);
  }
};

const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ update });
  } catch (error) {
    console.log(error);
  }
};

const deleteuser = async (req , res) => {
    try {
        const {id} = req.params
        const del = await model.findByIdAndDelete({_id : id})
        res.status(200).json({del})
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postuser, getuser, getsingleuser, updateuser , deleteuser };
