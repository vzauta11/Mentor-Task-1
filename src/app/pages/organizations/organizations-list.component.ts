import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, catchError, map, merge, switchMap, takeUntil } from 'rxjs';

import { OrganService } from '../../core/services/organ.service';
import { Organization } from 'src/app/core/interfaces/interfaces';
import { AddEditOrganizationComponent } from './add-edit-organization/add-edit-organization.component';
import { Unsub } from 'src/app/shared/unsubscribe/unSub';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsListComponent extends Unsub {

  data$?: Observable<Organization[]>;
  itemForm!: FormGroup;
  searchControl = new FormControl();
  dataNeedsUpdate = new BehaviorSubject(false);
  currentSort!: string; 
  
  
  constructor(
    private readonly organService: OrganService,
    private readonly dialog: MatDialog,
    private readonly router: Router
    ) {
      super();
      this.initData(); 
    }
    

  initData(): void {
    this.data$ = merge(this.searchControl.valueChanges, this.dataNeedsUpdate).pipe(
      switchMap(() => {        
        return this.organService.getOrganizations().pipe(
          map(res => {
          const isUp = this.currentSort === "Date ascending";
          const isDown = this.currentSort === "Date descending";
          return res.filter(item =>
            item.title?.toLowerCase().includes(this.searchControl?.value?.toLowerCase() || ''))
            .sort((a: any, b: any) => 
            isUp ? a.creationDate.localeCompare(b.creationDate): isDown ? b.creationDate.localeCompare(a.creationDate): 0);
        }))     
      })
    )
  }


  sortByDate(sortDate: any): void {
    this.currentSort = sortDate.value;
    this.dataNeedsUpdate.next(true);
  }

  openDialog(): void {
    this.dialog.open(AddEditOrganizationComponent, {
      width: "30%"
    })
    .afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((val) => {
      if (val === "Save") {
        this.dataNeedsUpdate.next(true)  
      }
    })
  }


  
  editOrg(row: Organization): void {
    this.dialog.open(AddEditOrganizationComponent, {
      width: "30%",
      data: row
    })
    .afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((val) => {
      if (val === "update") {
        this.dataNeedsUpdate.next(true)
      }
    })
  }



  deleteOrg(id: number): void {
    this.organService.deleteOrganization(id)
    .pipe(
      catchError(() => {
        alert('Error');

        return EMPTY;
      })
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      alert('Deleted Succesfully');
      this.dataNeedsUpdate.next(true);
    })
  }

  goToDetails(id: number): void {
    this.router.navigate(['organizations', id])
  }
 

  trackByFn(index: number, item: Organization): number {
    return item.id;
  }

  
}
