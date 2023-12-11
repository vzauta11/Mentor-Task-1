import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsListRoutingModule } from './organizations-list-routing.module';
import { OrganizationsListComponent } from './organizations-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { AddEditOrganizationComponent } from './add-edit-organization/add-edit-organization.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrgDetailsComponent,
    AddEditOrganizationComponent,
  ],

  imports: [
    CommonModule,
    OrganizationsListRoutingModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    SharedModule
    
     
  ]
})
export class OrganizationsListModule { }
