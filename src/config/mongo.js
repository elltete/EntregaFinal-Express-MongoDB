import mongoose from "mongoose";

process.loadEnvFile();

const URI_DB = process.env.URI_DB;

const connectdb = async () => {
  try {
    await mongoose.connect(URI_DB);
    console.log("Conexion Exitosa a la DB");
  } catch (error) {
    console.log("Conexion Fallida a la DB");
  }
};

export { connectdb };
