import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/core/interfaces';


@Injectable({
  providedIn: 'root'
})
export class OrganService {

  constructor(private readonly http: HttpClient) { }

  readonly URL = 'http://localhost:3000/posts'


  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.URL)
  }

  addOrganization(data: Organization):Observable<Organization> {
    return this.http.post<Organization>(this.URL, data)
  }

  editOrganization(data: Organization, id: number):Observable<Organization> {
    return this.http.put<Organization>(`${this.URL}/${id}`, data)
  }

  deleteOrganization(id: number):Observable<Organization> {
    return this.http.delete<Organization>(`${this.URL}/${id}`)
  }

  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${this.URL}/${id}`)
  }



}
