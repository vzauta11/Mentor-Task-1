import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://localhost:3000/posts'


  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.URL)
  }

  addItem(data: Item):Observable<Item> {
    return this.http.post<Item>(this.URL, data)
  }



}
