import SeriesModel from "../models/serieModels.js";

const getAllSeries = async (req, res) => {
  try {
    const series = await SeriesModel.getAllSeries();
    if (!series)
      return res.status(404).json({ message: "Data series not found" });
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: "Error internal server" });
  }
};

const getSeriebyId = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await SeriesModel.getSeriebyId(id);
    if (!serie) return res.status(404).json({ message: "Serie not found" });
    res.json(serie);
  } catch (error) {
    res.status(500).json({ message: "Error internal server" });
  }
};

const deleteSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await SeriesModel.deleteSerie(id);
    if (!serie) return res.status(404).json({ message: "Serie not found" });
    res.json({ message: "Serie Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error internal server" });
  }
};

const createSerie = async (req, res) => {
  try {
    const { title, genre, year, seasons, rating } = req.body;
    if (!title || !genre || !year || !seasons || !rating)
      return res.status(404).json({ message: "Bad request" });

    const newSerie = await SeriesModel.createSerie({
      title,
      genre,
      year,
      seasons,
      rating,
    });
    
    res.status(201).json(newSerie);
  } catch (error) {
    res.status(500).json({ message: "Error internal server" });
  }
};

const updateSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const serie = await SeriesModel.updateSerie(id, body);
    if (!serie) return res.status(404).json({ message: "Serie not found" });
    res.json({ message: "Serie Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error internal server" });
  }
};

export default {
  getAllSeries,
  getSeriebyId,
  deleteSerie,
  createSerie,
  updateSerie,
};
