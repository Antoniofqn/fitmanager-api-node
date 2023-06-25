import UserRepository from "../repositories/user.repository.js";

async function createUser(user) {
    return await UserRepository.insertUser(user);
}

async function getUser(id) {
    return await UserRepository.getUser(id);
}

async function deleteUser(id) {
  await UserRepository.deleteUser(id);
}

async function getUsers() {
  return await UserRepository.getUsers();
}


export default {
    createUser,
    getUser,
    getUsers,
    deleteUser
  }
