import { heroes } from "../data/heroes";
import type { Request, Response, } from "express";

const getAll = (req: Request, res: Response) => res.send(heroes);

export {getAll};
