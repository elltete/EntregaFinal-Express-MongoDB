import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("users", userSchema);

const register = async (dataUser) => {
  const { username, password } = dataUser;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return null;
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, salt);

  const newUser = new User({ username, password: hashedPass });
  newUser.save();
  return newUser;
};

const login = async (dataUser) => {
  const { username, password } = dataUser;

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return null; // Usuario no encontrado
  }

  const isMatch = await bcryptjs.compare(password, existingUser.password);
  if (!isMatch) {
    return null;
  }

  const token = jwt.sign(
    { id: existingUser._id, username: existingUser.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

export default { register, login };
