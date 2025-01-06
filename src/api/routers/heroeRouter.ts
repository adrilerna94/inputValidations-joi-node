import { Router } from "express";
import { validateHeroe } from "../middlewares/heroeValidation";
import { heroeIdSchema, heroeCreateSchema } from "../models/Joi/heroeSchemas";
import {createHeroe, getHeroeById, getHeroes, updateHeroeById} from "../controllers/heroeController";

const heroeRouter = Router();

heroeRouter.get('/', getHeroes);
heroeRouter.get('/:id', validateHeroe(heroeIdSchema, 'params'), getHeroeById);
heroeRouter.post('/', validateHeroe(heroeCreateSchema, 'body'), createHeroe);
// quiero utilizar queryString --> aunque sea poco común
heroeRouter.put('/', validateHeroe(heroeIdSchema, 'query'), validateHeroe(heroeCreateSchema, 'body'), updateHeroeById);

export default heroeRouter;
