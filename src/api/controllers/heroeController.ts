import { heroes } from "../data/heroes";
import type { Request, Response, } from "express";

const getHeroes = (req: Request, res: Response) => res.send(heroes);

export {getHeroes};
