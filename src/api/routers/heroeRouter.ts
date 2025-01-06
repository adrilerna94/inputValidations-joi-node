import { Router } from "express";
import { validateHeroe } from "../middlewares/heroeValidation";
import { heroeIdSchema, heroeCreateSchema } from "../models/Joi/heroeSchemas";
import {getHeroes} from "../controllers/heroeController";

const heroeRouter = Router();

heroeRouter.get('/', getHeroes);

export default heroeRouter;
