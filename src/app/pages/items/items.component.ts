import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ItemsService } from './infrastructure/items.service';
import { Item } from 'src/app/core/interfaces';
import { EMPTY, catchError } from 'rxjs';
import { AddItemComponent } from '../add-item/add-item.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent {

  items?: Item[];

  constructor(
    private readonly itemsService: ItemsService,
    private readonly dialog: MatDialog,
    private readonly cdRef: ChangeDetectorRef
    ) {
    this.initData()
    }


  initData(): void {
    this.itemsService
      .getItems()
      .pipe(
        catchError(() => {
          alert('Error');

          return EMPTY;
        })
      )
      .subscribe((items: Item[]) => {
        this.items = items;        
        this.cdRef.markForCheck();
      });
  }


  filterItems(e: Event): void {
    this.itemsService
    .getItems()
    .pipe(
      catchError(() => {
        alert('Error');
        
        return EMPTY;
      })
    )
    .subscribe((res) => {
      const filterValue = (e.target as HTMLTextAreaElement).value;
      this.items = res.filter(item =>
        item?.title.toLowerCase().includes(filterValue.toLowerCase()));      
        this.cdRef.markForCheck();
    })
  }
  
  openDialog(): void {
    this.dialog.open(AddItemComponent, {
      width: "30%"
    }).afterClosed().subscribe((val) => {
      if (val === "Save") {
        this.initData()   
         }
    })
  }



  trackByFn(index: number, item: Item): number {
    return item.id;
  }


  
}
