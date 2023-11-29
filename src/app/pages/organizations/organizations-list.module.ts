import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsListRoutingModule } from './organizations-list-routing.module';
import { OrganizationsListComponent } from './organizations-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { OrgDetailsComponent } from './org-details/org-details.component';


@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrgDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    OrganizationsListRoutingModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule
    
    
     
  ]
})
export class OrganizationsListModule { }
