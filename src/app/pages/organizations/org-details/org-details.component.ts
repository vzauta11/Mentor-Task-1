import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Organization } from 'src/app/core/interfaces/interfaces';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgDetailsComponent {
  constructor(private readonly route: ActivatedRoute) {}

  readonly organization$: Observable<Organization> = this.route.data.pipe(
    map(({ org }) => org)
  );
}
