import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import {v4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb(): {} {
    return {
      owners: [
        {
          id: v4(),
          firstName: 'Наталья',
          middleName: 'Игоревна',
          lastName: 'Петрова',
          cars: [
              {
              yearOfProduction: new Date().setFullYear(2009),
              authorName: 'Hyundai',
              model: 'Accent',
              identicalNumber: 'AX2121HP'
            },
            {
              yearOfProduction:  new Date().setFullYear(2019),
              authorName: 'KIA',
              model: 'Optima',
              identicalNumber: 'BC7286AE'
            },
            {
              yearOfProduction:  new Date().setFullYear(2020),
              authorName: 'Ferrari',
              model: 'laFerrari',
              identicalNumber: 'BA2043CE'
            }
          ]
        },
        {
          id: v4(),
          firstName: 'Иван',
          middleName: 'Иванович',
          lastName: 'Иванов',
          cars: [
            {
              yearOfProduction:  new Date().setFullYear(2009),
              authorName: 'Hyundai',
              model: 'Accent',
              identicalNumber: 'AX2121HP'
            },
            {
              yearOfProduction:  new Date().setFullYear(2019),
              authorName: 'KIA',
              model: 'Optima',
              identicalNumber: 'BC7286AE'
            },
          ]
        },
        {
          id: v4(),
          firstName: 'Алексей',
          middleName: 'Сергеевич',
          lastName: 'Антонов',
          cars: [
            {
              yearOfProduction:  new Date().setFullYear(2009),
              authorName: 'Hyundai',
              model: 'Accent',
              identicalNumber: 'AX2121HP'
            }
          ]
        }
      ]
    };
  }
}
