require("../src/db/mongoose");
const Task = require("../src/models/task");

const findAndDelete = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return { task, count };
};

findAndDelete("5e54eb9174075960d03b5692")
  .then(result => console.log(result))
  .catch(e => console.log(e));
