import { Router } from "express";
import serieController from '../controllers/serieControllers.js';

const serieRoutes = Router();

serieRoutes.route('/')
    .get(serieController.getAllSeries)
    .post(serieController.createSerie);

serieRoutes.route('/:id')
  .get(serieController.getSeriebyId)
  .patch(serieController.updateSerie)
  .delete(serieController.deleteSerie);

export { serieRoutes }