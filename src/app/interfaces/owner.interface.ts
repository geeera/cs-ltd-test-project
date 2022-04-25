import {ICar} from "./car.interface";

export interface IOwner {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  cars: ICar[]
}
