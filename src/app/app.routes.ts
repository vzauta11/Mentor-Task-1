import { Route } from '@angular/router';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'organizations',
    pathMatch: 'full',
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import('../../src/app/pages/organizations/organizations.routes').then(
        (m) => m.ORG_ROUTES
      ),
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];
