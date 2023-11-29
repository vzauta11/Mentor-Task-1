import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgResolver } from './resolvers/org.resolver';

const routes: Routes = [

  {
    path: '',
    component: OrganizationsListComponent
  },

  {
    path: ':id',
    resolve: { org: OrgResolver },
    component: OrgDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsListRoutingModule { }
