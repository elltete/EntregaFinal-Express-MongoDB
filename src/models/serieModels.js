import mongoose from "mongoose";

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    genre: [{ type: String, required: true }],
    year: {
      type: Number,
      required: true,
    },
    seasons: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Serie = mongoose.model("series", serieSchema);

const getAllSeries = async () => {
  try {
    const serie = await Serie.find();
    return serie;
  } catch (error) {
    throw new Error("Error al obtener series");
  }
};

const getSeriebyId = async (id) => {
  try {
    const serie = await Serie.findById(id);
    return serie;
  } catch (error) {
    throw new Error("Error al obtener la serie");
  }
};

const deleteSerie = async (id) => {
  try {
    const serie = await Serie.findByIdAndDelete(id);
    return serie;
  } catch (error) {
    throw new Error("Error al eliminar la serie");
  }
};

const createSerie = async (dataSerie) => {
  try {
    const newSerie = new Serie(dataSerie);
    newSerie.save();
    return newSerie;
  } catch (error) {
    throw new Error("Error al crear la serie");
  }
};

const updateSerie = async (id, updateSerie) => {
  try {
    const serie = await Serie.findByIdAndUpdate(id, updateSerie);
    return serie;
  } catch (error) {
    throw new Error("Error al modificar la serie");
  }
};

export default {
  getAllSeries,
  getSeriebyId,
  deleteSerie,
  createSerie,
  updateSerie,
};
