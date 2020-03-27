const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }]
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: "Steelslayer",
  email: "steelslayer@example.com",
  password: "myHouse099@@",
  tokens: [{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET) }]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First Task",
  completed: false,
  owner: userOneId
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second Task",
  completed: true,
  owner: userOneId
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third Task",
  completed: false,
  owner: userTwoId
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await User.create(userOne);
  await User.create(userTwo);
  await Task.create(taskOne);
  await Task.create(taskTwo);
  await Task.create(taskThree);
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  setUpDatabase,
  taskOneId: taskOne._id
};
