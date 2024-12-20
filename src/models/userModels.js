import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi"

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

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(10).required(),
    password: Joi.string().min(8).max(20).required(),
  })
  return schema.validate(user)
}

const register = async (dataUser) => {
  try {
    const { username, password } = dataUser;

    const data = validateUser(dataUser);
    if (data.error) {
      return 1;
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return null;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, password: hashedPass });
    newUser.save()
    return newUser;

  } catch (error) {
    throw new Error("Error registering user");
  }
};

const login = async (dataUser) => {
  try {
    const { username, password } = dataUser;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return null;
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
  } catch (error) {
    throw new Error("Error loging user");
  }
};

export default { register, login };
