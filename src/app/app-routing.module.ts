import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'organizations',
    pathMatch: 'full'
  },

  {
    path: 'organizations',
    loadChildren: () => import ('./pages/organizations/organizations-list.module').then(m => m.OrganizationsListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
