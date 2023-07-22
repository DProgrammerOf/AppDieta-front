import {Injectable} from '@angular/core';
import {BaseService, Response, Diary, DiaryFood} from "./base.service";
import {Observable} from "rxjs";

// Response body
export interface AllDiaries extends Response {
  diaries: Diary[]
}

export interface OneDiary extends Response {
  diary: Diary
}

// Response body

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(
    private base: BaseService
  ) {
  }

  public listAll(): Observable<AllDiaries> {
    return this.base.get('/diary');
  }

  public store(date: string, foods: DiaryFood[]): Observable<AllDiaries> {
    return this.base.post('/diary/save', {date, foods});
  }
}
