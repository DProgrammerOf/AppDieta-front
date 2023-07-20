import {Injectable} from '@angular/core';
import {BaseService, Food} from "./base.service";
import {Observable} from "rxjs";

// Response body
interface ResponseAll {
  success: Boolean,
  message: string,
  food?: Food[] | undefined | null
}

interface ResponseOne {
  success: Boolean,
  message: string,
  food?: Food | undefined | null
}

interface Response {
  success: Boolean,
  message: string
}

// Response body

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private base: BaseService
  ) {
  }

  public listAll(): Observable<ResponseAll> {
    return this.base.get('/food');
  }

  public listOne(id: Number): Observable<ResponseOne> {
    return this.base.get('/food/' + id.toString());
  }

  public store(food: Food): Observable<Response> {
    return this.base.post('/food/save', food);
  }
}
