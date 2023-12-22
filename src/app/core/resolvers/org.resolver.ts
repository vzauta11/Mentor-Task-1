import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Organization } from 'src/app/core/interfaces/interfaces';
import { OrganService } from '../services/organ.service';

@Injectable({
  providedIn: 'root',
})
export class OrgResolver implements Resolve<Organization | null> {
  constructor(private readonly organService: OrganService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Organization | null> {
    const id = route.paramMap.get('id');

    return !id
      ? of(null)
      : this.organService
          .getOrganization(+id)
          .pipe(
            catchError(() =>
              throwError(() => new Error('Organization Not Found!'))
            )
          );
  }
}
