import mongoose from "mongoose";
import Joi from "joi"

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
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
    throw new Error("Error getting series");
  }
};

const getSeriebyId = async (id) => {
  try {
    const serie = await Serie.findById(id);
    return serie;
  } catch (error) {
    throw new Error("Error getting a serie");
  }
};

const deleteSerie = async (id) => {
  try {
    const serie = await Serie.findByIdAndDelete(id);
    return serie;
  } catch (error) {
    throw new Error("Error deleting serie");
  }
};

const validateSerie = (serie) => {
  let year = new Date().getFullYear();

  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    genre: Joi.array().items(Joi.string().min(3).max(10).required()).required(),
    year: Joi.number().integer().min(1900).max(year).required(),
    seasons: Joi.number().integer().min(1).max(40).required(),
    rating: Joi.number().min(0).max(10).required(),
  })
  return schema.validate(serie)
}

const createSerie = async (dataSerie) => {
  try {
    const data = validateSerie(dataSerie);
    if (data.error) {
      return 1;
    }
    
    const newSerie = new Serie(dataSerie);
    newSerie.save();
    return newSerie;
  } catch (error) {
    throw new Error("Error creating a serie");
  }
};

const updateSerie = async (id, updateSerie) => {
  try {
    const serie = await Serie.findByIdAndUpdate(id, updateSerie);
    return serie;
  } catch (error) {
    throw new Error("Error updating a serie");
  }
};

export default {
  getAllSeries,
  getSeriebyId,
  deleteSerie,
  createSerie,
  updateSerie,
};
