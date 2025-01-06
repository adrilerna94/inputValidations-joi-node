import { Router } from "express";
import { validateHeroe } from "../middlewares/heroeValidation";
import { heroeIdSchema, heroeCreateSchema } from "../models/Joi/heroeSchemas";
import {getHeroeById, getHeroes} from "../controllers/heroeController";

const heroeRouter = Router();

heroeRouter.get('/', getHeroes);
heroeRouter.get('/:id', validateHeroe(heroeIdSchema, 'params'), getHeroeById);

export default heroeRouter;
