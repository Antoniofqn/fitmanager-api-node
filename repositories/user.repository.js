import User from "../models/user.model.js"

async function insertUser(user) {
    try {
        return await User.create(user);
    } catch (error) {
      console.log(error)
        throw error;
    }
}

async function getUser(id) {
    try {
        return await User.findByPk(id);
    } catch (error) {
        throw error;
    }
}

async function getUsers() {
  try {
      return await User.findAll({
          order: [
              ['UserId','ASC']
          ]
      });
  } catch (error) {
      throw error;
  }
}

async function deleteUser(id) {
  try {
      await User.destroy({
          where: {
              UserId: id
          }
      });
  } catch (error) {
      throw error;
  }
}

export default {
    insertUser,
    getUser,
    getUsers,
    deleteUser
}
