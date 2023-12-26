import { Route } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list.component';
import { OrgResolver } from 'src/app/core/resolvers/org.resolver';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { PagenotfoundComponent } from 'src/app/core/pagenotfound/pagenotfound.component';

export const ORG_ROUTES: Route[] = [
  {
    path: '',
    component: OrganizationsListComponent,
  },
  {
    path: ':id',
    resolve: { org: OrgResolver },
    component: OrgDetailsComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];
