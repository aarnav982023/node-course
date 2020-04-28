const users = {};

// addUser, removeUser, getUser, getUsersInrRoom

const addUser = ({ id, username, room }) => {
  //Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  //Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  //Check for existing User
  const existingUser = Object.values(users).find((user) => {
    return user.room === room && user.username === username;
  });
  //Validate username
  if (existingUser) {
    return { error: "Username is in use!" };
  }

  //Store User
  users[id] = { username, room };
  return { user: users[id] };
};

const removeUser = (id) => {
  const deleted = users[id];
  delete users[id];
  return deleted;
};

const getUser = (id) => {
  return users[id];
};

const getUsersInRoom = (room) => {
  return Object.values(users).filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
