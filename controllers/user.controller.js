import UserService from "../services/user.service.js";
import bcrypt from 'bcrypt';
import { generateToken } from '../auth.js'
import User from "../models/user.model.js"

async function createUser(req, res, next) {
    try {
        let user = req.body;

        user.password = await bcrypt.hash(user.password, 10);

        user = await UserService.createUser(user);
        res.send(user);
    } catch(error) {
        next(error);
    }
}

async function getUser(req, res, next) {
    try {
        const id =  req.params.id;
        res.send(await UserService.getUser(id));
    } catch (error) {
        next(error)
    }
}

async function getUsers(req, res, next) {
  try {
      res.send(await UserService.getUsers());
  } catch(error) {
      next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
      const id =  req.params.id;
      await UserService.deleteUser(id);
      res.end();
  } catch (error) {
      next(error)
  }
}

// Login route
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // If the user is not found or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token for the user
    const token = generateToken({ userId: user.UserId, email: user.email });

    // Return the token as the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCurrentUser(req, res) {
  const currentUser = req.user;
  res.json(currentUser);
}

export default {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    login,
    getCurrentUser
}
