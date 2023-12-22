import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgResolver } from '../../core/resolvers/org.resolver';
import { PagenotfoundComponent } from 'src/app/core/pagenotfound/pagenotfound.component';
import { OrganizationsListComponent } from './organizations-list.component';

export const ORG_ROUTES: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(ORG_ROUTES)],
  exports: [RouterModule],
})
export class OrganizationsListRoutingModule {}
