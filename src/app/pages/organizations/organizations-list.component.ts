import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganService } from '../services/organ.service';
import { Organization } from 'src/app/core/interfaces';
import { BehaviorSubject, EMPTY, Observable, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { AddEditOrganizationComponent } from './add-edit-organization/add-edit-organization.component';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsListComponent{

  itemForm!: FormGroup;

  data$?: Observable<Organization[]>;
  
  searchControlTwo = new FormControl();

  dataNeedsUpdate = new BehaviorSubject(false);


  dateDirections : string[] = [ "Date ascending", "Date descending"];

  currentSort!: string; 
  
  constructor(
    private readonly organService: OrganService,
    private readonly dialog: MatDialog,
    private readonly router: Router
    
    ) {
      this.initData();
    }
    


  initData(): void {
    this.data$ = merge(this.searchControlTwo.valueChanges, this.dataNeedsUpdate).pipe(
      startWith(''),
      switchMap(() => {
        return this.organService.getOrganizations().pipe(map(res => {
          const isUp = this.currentSort === "Date ascending";
          const isDown = this.currentSort === "Date descending";
          return res.filter(item =>
            item.title.toLowerCase().includes(this.searchControlTwo?.value?.toLowerCase() || ''))
            .sort((a: any, b: any) => 
            isUp ? a.creationDate.localeCompare(b.creationDate): isDown ? b.creationDate.localeCompare(a.creationDate): 0);
        }))     

      })
    )
  }

  sortingByDate(sortDate: any): void {
    this.currentSort = sortDate.value;
    this.dataNeedsUpdate.next(true);
    console.log(this.currentSort);
  }

  openDialog(): void {
    this.dialog.open(AddEditOrganizationComponent, {
      width: "30%"
    }).afterClosed().subscribe((val) => {
      if (val === "Save") {
        this.dataNeedsUpdate.next(true)  
      }
    })
  }


  
  editOrg(row: Organization): void {
    this.dialog.open(AddEditOrganizationComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe((val) => {
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
    ).subscribe(() => {
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
