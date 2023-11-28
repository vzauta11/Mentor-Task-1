import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { OrganService } from '../services/organ.service';
import { Organization } from 'src/app/core/interfaces';
import { EMPTY, Observable, catchError, map, startWith, switchMap } from 'rxjs';
import { AddEditOrganizationComponent } from './add-edit-organization/add-edit-organization.component';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';


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
  
  constructor(
    private readonly organService: OrganService,
    private readonly dialog: MatDialog,
    private readonly cdRef: ChangeDetectorRef,
    
    ) {
      this.initData();
    }
    


  initData(): void {
    this.data$ = this.searchControlTwo.valueChanges.pipe(
      startWith(''),
      switchMap((searchValue) => {
        return this.organService.getOrganizations().pipe(map(res => {
          return res.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()));
        }))     

      })
    )
  }

  openDialog(): void {
    this.dialog.open(AddEditOrganizationComponent, {
      width: "30%"
    }).afterClosed().subscribe((val) => {
      if (val === "Save") {
        this.initData();  
      }
      this.cdRef.markForCheck();
    })
  }


  
  editOrg(row: Organization): void {
    this.dialog.open(AddEditOrganizationComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe((val) => {
      if (val === "update") {
        this.initData()
      }
      this.cdRef.markForCheck();
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
      this.initData();
      this.cdRef.markForCheck();
    })
  }

 

  trackByFn(index: number, item: Organization): number {
    return item.id;
  }


  
}
