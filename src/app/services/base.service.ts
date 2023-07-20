import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

// Object food
export interface Food {
  id?: Number,
  rotulo: string,
  tabela: {
    calorias: Number,
    carboidratos: Number,
    fibra: Number,
    gorduras: Number,
    proteinas: Number,
    sodio: Number
  },
  created_at?: string,
  updated_at?: string
}

// Object food

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url: String = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) {
  }

  public get(endpoint: string): Observable<any> {
    return this.http.get(this.url.concat(endpoint));
  }

  public post(endpoint: string, data: Object): Observable<any> {
    return this.http.post(this.url.concat(endpoint), data);
  }
}
