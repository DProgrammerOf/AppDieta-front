import {Injectable} from '@angular/core';
import {BaseService, Food, Response} from "./base.service";
import {Observable} from "rxjs";

// Response body
export interface AllFoods extends Response {
  food?: Food[] | undefined | null
}

export interface OneFood {
  food?: Food | undefined | null
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

  public listAll(): Observable<AllFoods> {
    return this.base.get('/food');
  }

  public listOne(id: Number): Observable<OneFood> {
    return this.base.get('/food/' + id.toString());
  }

  public store(food: Food): Observable<Response> {
    return this.base.post('/food/save', food);
  }
}
