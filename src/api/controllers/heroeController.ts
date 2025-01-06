import { heroes } from "../data/heroes";
import type { Request, Response, } from "express";

const getHeroes = (req: Request, res: Response) => res.send(heroes);

const getHeroeById = (req: Request, res: Response) => {
  const id = req.params.id;
  const heroe = heroes.find((heroe) => heroe.id === id);

  if (!heroe){
    res.status(404).send({ERROR: `Heroe with ID = ${id} Not Found.`});
  }
  const identifier:string = heroe?.alias || heroe?.email || 'default identifier';
  res.status(200).json({
    status: 'Success',
    [identifier]: heroe
  });
}

export {getHeroes, getHeroeById};
