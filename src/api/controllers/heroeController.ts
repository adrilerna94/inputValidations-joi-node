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
  const {id} = req.query; // utilizamos query string  ➡️ http://localhost:3000/api/v1/heroes?id=4f81bbdd-66b9-41bb-a9c9-0c81ca0b25f2

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

const deleteHeroeById = (req: Request, res: Response) => {

  const heroeIndex = heroes.findIndex((x) => x.id == req.params.id);

  if (heroeIndex === -1) return res.status(404).json({error: `Heroe with ID ${req.params.id} NOT FOUND`});

  try{

    // Filtra los héroes que NO coinciden con el id proporcionado.
    const filteredArrayHeroes = heroes.filter((heroe) => heroe.id !== req.params.id);

    // vacía array original ➡️ no podemos reasignar por el uso de const en heroes data
    heroes.length = 0;

    // Agrega los elementos filtrados de vuelta al array original
    heroes.push(...filteredArrayHeroes);

    return res.status(204).end();  // necesitas send() || end()

  } catch (e) {

    return res.status(500).json({
      status: 'Fail',
      msn: `Heroe with ID ${req.params.id} couldn't be deleted`,
      errors: e.messages
    });
  }

}



export { getHeroes, getHeroeById, createHeroe, updateHeroeById, deleteHeroeById };


/*
    // codigo 204 (No content) ➡️ no devuelve contenido en la respuesta. por eso usaremos 200
    //const [heroe] = heroes.splice(heroeIndex, 1);
    return res.status(204).send({
      status: 'Success',
      msn: `Heroe with ID ${req.params.id} deleted Successfully`,
      heroeDeleted: heroe
    });
*/


/* ELIMINACIÓN MÁS OPTIMA CON ➡️ SPLICE
  heroes.splice(heroeIndex, 1);
*/

/* ELIMINACIÓN CON SLICE ➡️
// Usamos slice para obtener un nuevo array sin el héroe con ese índice
if (heroIndex !== -1) {
  // Reemplazamos el array original con el nuevo array modificado
  heroes = [
    ...heroes.slice(0, heroIndex),  // Elementos antes del héroe
    ...heroes.slice(heroIndex + 1)  // Elementos después del héroe
  ];
  🧠 Cuando usarlo
  Si prefieres no modificar el array original y obtener un nuevo array sin el elemento,
   puedes usar slice() y asignar el resultado a la misma variable heroes.

*/

