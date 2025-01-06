import Joi from "joi";
import { OriginPlanet } from "../Enums/originPlanetEnum";
import { CostumColor } from "../Enums/customColorEnum";

//Convertimos enum en un array de values
const originPlanetValues = Object.values(OriginPlanet);
const costumeColorValues = Object.values(CostumColor);

const heroeCreateSchema = Joi.object({
  alias: Joi.string().required().pattern(/^[a-zA-Z]{3,30}$/).optional(), // default optional() no necesario ponerlo
  email: Joi.string().email().min(5).max(100), // 1o string() 2/ .email()
  superpower: Joi.string().required().pattern(/^[A-Za-z\s]$/).min(5).max(100),
  // EASY ➡️ originPlanet: Joi.string().valid('Earth', 'Mars', 'Krypton', 'Venus', 'Asgard').required(),
  originPlanet: Joi.valid(...originPlanetValues).required(),
  debutYear: Joi.number().min(1921).max(2024),
  costumeColor: Joi.string().valid(...costumeColorValues),
  //costumecolor: Joi.string().valid('red', 'blue', 'black'...)
  archnemesis: Joi.string().max(50),
  dateOfBirth: Joi.date().iso().less(`${new Date().getFullYear()-18}-01-06`).required(), // mayor de edad
  lastSeen: Joi.date().iso().greater('2020-01-01').optional(),
  password: Joi.string().required().alphanum().min(8). max(30),
  //password: Joi.string().required().pattern(/^[a-zA-Z0-9]{8,30}$/)
  repeatPassword: Joi.any().valid(Joi.ref('password')).messages({ "any.only": "Password and RepeatPassword must match" }),
})
.or('alias', 'email')
.with('password', 'repeatPassword');

const heroeIdSchema = Joi.object({
  id: Joi.string()
      .messages({
        'string.guid' : 'id must meet UUID format',
        'any.required' : 'id is required'
      })
      .guid({ version: 'uuidv4'})
      .required()
});

export { heroeCreateSchema, heroeIdSchema };

/*
📌 .guid({ version: "uuidv4" }) - Validación de UUID con Joi
------------------------------------------------------------
🧩 ¿Qué hace .guid()?
- Valida si un string es un GUID o UUID.
- Un UUID (Universally Unique Identifier) es un identificador único estándar
  ampliamente utilizado para identificar recursos de manera global.

🌀 Versiones de UUID:
- Existen varias versiones de UUID, pero la versión 4 es la más común.
- Los UUID v4 se generan de forma aleatoria.

📋 Formato de un UUID v4:
- xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
  Donde:
  ➡️ `x` son dígitos hexadecimales (0-9, a-f).
  ➡️ `M` indica la versión (en este caso, siempre 4).
  ➡️ `N` contiene un identificador de variante (generalmente, entre 8 y b).

✅ Ejemplo de UUID v4 válido:
- 550e8400-e29b-41d4-a716-446655440000

🎯 ¿Qué hace `{ version: "uuidv4" }`?
- Asegura que solo se acepten UUID de versión 4.
*/
