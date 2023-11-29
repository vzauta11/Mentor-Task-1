import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Organization } from 'src/app/core/interfaces';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgDetailsComponent {

  constructor(private readonly route: ActivatedRoute) {

  }
  
  readonly organization$: Observable<Organization> = this.route.data.pipe(
    map(( {org} ) => org)
  )

}
