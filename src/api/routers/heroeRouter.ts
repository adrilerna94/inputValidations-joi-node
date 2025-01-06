import { Router } from "express";
import { validateHeroe } from "../middlewares/heroeValidation";
import { heroeIdSchema, heroeCreateSchema } from "../models/Joi/heroeSchemas";
import {createHeroe, getHeroeById, getHeroes} from "../controllers/heroeController";

const heroeRouter = Router();

heroeRouter.get('/', getHeroes);
heroeRouter.get('/:id', validateHeroe(heroeIdSchema, 'params'), getHeroeById);
heroeRouter.post('/', validateHeroe(heroeCreateSchema, 'body'), createHeroe);

export default heroeRouter;
