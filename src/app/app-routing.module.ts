import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'organizations',
    pathMatch: 'full',
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import(
        '../../src/app/pages/organizations/organizations-list-routing.module'
      ).then((m) => m.ORG_ROUTES),
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
