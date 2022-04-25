import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOwner} from "../interfaces/owner.interface";
import {ICar} from "../interfaces/car.interface";
import {v4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private ownersUrl = 'api/owners';

  constructor(private http: HttpClient) { }

  getOwners(): Observable<IOwner[]> {
    return this.http.get<IOwner[]>(this.ownersUrl)
  }

  getOwnerById(id: string): Observable<IOwner> {
    return this.http.get<IOwner>(this.ownersUrl + `/${id}`)
  }

  createOwner(firstName: string, middleName: string, lastName: string, cars: ICar[]): Observable<IOwner> {
    const owner: IOwner = {
      firstName,
      middleName,
      lastName,
      cars,
      id: v4()
    };

    return this.http.post<IOwner>(this.ownersUrl, owner);
  }

  editOwner(updatedOwner: IOwner): Observable<IOwner> {
    return this.http.put<IOwner>(this.ownersUrl + `/${updatedOwner.id}`, updatedOwner)
  }

  deleteOwner(ownerId: string): Observable<IOwner[]> {
    return this.http.delete<IOwner[]>(this.ownersUrl + `/${ownerId}`)
  }
}
