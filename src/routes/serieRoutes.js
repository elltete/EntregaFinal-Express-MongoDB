import { Router } from "express";
import serieController from '../controllers/serieControllers.js';

const seriesRoutes = Router();

seriesRoutes.route('/')
    .get(serieController.getAllSeries)
    .post(serieController.createSerie);

seriesRoutes.route('/:id')
  .get(serieController.getSeriebyId)
  .patch(serieController.updateSerie)
  .delete(serieController.deleteSerie);

export { seriesRoutes }