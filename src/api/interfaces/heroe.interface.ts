import { OriginPlanet as OriginPlanetEnum} from "../models/Enums/originPlanetEnum";
import { CustomColor as CustomColorEnum} from "../models/Enums/customColorEnum";

export interface Heroe {
  // property? ➡️ OPCIONAL
  id?: string,
  alias?: string,
  email?: string,
  superpower: string,
  originPlanet: OriginPlanetEnum,
  debutYear?: number,
  customColor?: CustomColorEnum,
  archnemesis?: string,
  dateOfBirth: Date,
  lastSeen?: Date,
  photo?: string,
  password: string,
  repeatPassword: string

}
