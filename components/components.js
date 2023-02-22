const model = require("../model/model");

const postuser = async (req, res) => {
  try {
    const post = await model.create(req.body);
    res.status(201).json({ post });
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
    const { id } = req.params;
    const get = await model.findOne({ _id: id });
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
