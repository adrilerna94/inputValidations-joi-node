import { heroes } from "../data/heroes";
import { v4 as uuidv4} from "uuid";
import type { Request, Response } from "express";

const getHeroes = (req: Request, res: Response) => res.send(heroes);

const getHeroeById = (req: Request, res: Response) => {
  const id = req.params.id;
  const heroe = heroes.find((heroe) => heroe.id === id);

  if (!heroe){
    return res.status(404).send({ERROR: `Heroe with ID = ${id} Not Found.`});
  }
  const identifier:string = heroe?.alias || heroe?.email || 'default identifier';
  return res.status(200).json({
    status: 'Success',
    [identifier]: heroe
  });
}

function createHeroe (req: Request, res: Response) {

  // generamos Universal Unique Identifier version 4 para el ID de forma automática con la librería uuid
  const newHeroe = {id: uuidv4(), ...req.body};
  const {id} = newHeroe;

  try {
    heroes.push(newHeroe);
    const identifier : string = newHeroe.alias || newHeroe.id;
    return res.status(201).send({
      msn: `Heroe with ID ${id} created Successfully.`,
      [identifier]: newHeroe
    });
  } catch (error) {
    return res.status(500).json({
      msn : `Failed to add Heroe with ID ${id}.`,
      error: error.message
    });
  }

}

const updateHeroeById = (req: Request, res: Response) => {
  const {id} = req.query; // utilizamos query string url/?id=

  const index = heroes.findIndex((element) => element['id'] === id);
  if (index === -1) {
    return res.status(400).send({
      msn: `Heroe with ID: ${id} NOT FOUND`
    });
  }
  try {
    heroes[index] = {id, ...req.body};
    const identifier: string = req.body.alias || req.body.email;
    return res.status(200).send({status: 'Success', [identifier]: heroes[index] });

  } catch (error) {
    return res.status(500).json(error.messages);
  }


}

export {getHeroes, getHeroeById, createHeroe, updateHeroeById};
