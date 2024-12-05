import UserModel from "../models/userModels.js";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const newUser = await UserModel.register({ username, password });

    if (!newUser) {
      return res.status(400).json({ error: "user already exists" });
    }

    if (newUser === 1) {
      return res.status(400).json({ error: "Error in data entry" });
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error internal server" });
  }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
  
      const token = await UserModel.login({ username, password });
  
      if (!token) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      return res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export default { register, login };
