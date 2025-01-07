import { OriginPlanet as OriginPlanetEnum} from "../models/Enums/originPlanetEnum";
import { CostumeColor as CostumeColorEnum} from "../models/Enums/costumeColorEnum";

export interface Heroe {
  // property? ➡️ OPCIONAL
  id?: string,
  alias?: string,
  email?: string,
  superpower: string,
  originPlanet: OriginPlanetEnum,
  debutYear?: number,
  costumeColor?: CostumeColorEnum,
  archnemesis?: string,
  dateOfBirth: Date,
  lastSeen?: Date,
  photo?: string,
  password: string,
  repeatPassword: string

}
