import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemsService } from '../items/infrastructure/items.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemComponent {

  itemForm !: FormGroup;

 readonly itemLogo: string = "https://www.freakyjolly.com/wp-content/uploads/2021/07/cropped-cropped-fj-logo-192-removebg-preview-e1625997712615-1.png";

  constructor (
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private dialogRef: MatDialogRef<AddItemComponent>
    ) {
     
    this.itemForm = this.fb.group({

      title: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required]
      }),
      trackinuse: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      }),
      trackAssigned: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      }),
      protinuse: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      }),
      protAssigned: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      }),

      itemLogo: this.itemLogo
      
      })
  }
  
  addNewItem(): void {
    this.itemsService.addItem(this.itemForm.value)
    .pipe(
      catchError(() => {
        alert('Error');
        
        return EMPTY;
      })
    ).subscribe(() => {
      alert("Item Added Succesfully"),
      this.itemForm.reset(),   
      this.dialogRef.close("Save")
    })
  }


}


