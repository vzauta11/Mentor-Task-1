import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganService } from '../../../core/services/organ.service';
import { EMPTY, catchError } from 'rxjs';
import { Organization } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-add-edit-organization',
  templateUrl: './add-edit-organization.component.html',
  styleUrls: ['./add-edit-organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditOrganizationComponent {

  organForm !: FormGroup;

  actionBtn: string = 'Save';

  constructor (
    private readonly fb: FormBuilder,
    private readonly organService: OrganService,
    private readonly dialogRef: MatDialogRef<AddEditOrganizationComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Organization,
    ) {
     
  this.organForm = this.fb.group({
      
      orgLogo: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required]
      }),
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
      creationDate: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required]
      }),
      protAssigned: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      })

  })


  if (this.editData) {
        this.actionBtn = "Update"
        this.organForm.controls['orgLogo'].setValue(this.editData.orgLogo)
        this.organForm.controls['title'].setValue(this.editData.title)
        this.organForm.controls['trackinuse'].setValue(this.editData.trackinuse)
        this.organForm.controls['trackAssigned'].setValue(this.editData.trackAssigned)
        this.organForm.controls['protinuse'].setValue(this.editData.protinuse)
        this.organForm.controls['creationDate'].setValue(this.editData.creationDate)
        this.organForm.controls['protAssigned'].setValue(this.editData.protAssigned)
    }
  
  }
  
  addNewOrganization(): void {
    if(!this.editData) {
    this.organService.addOrganization(this.organForm.value)
    .pipe(
      catchError(() => {
        alert('Error');
        
        return EMPTY;
      })
    ).subscribe(() => {
      alert("Organization Added Succesfully"),
      this.organForm.reset(),   
      this.dialogRef.close("Save")
    })
  } else {
    this.updateOrganization()
  }
 }


  updateOrganization(): void {
    this.organService.editOrganization(this.organForm.value, this.editData.id).subscribe(() => {
      alert("Organization Updated Succesfully"),
      this.organForm.reset(),
      this.dialogRef.close("update")
    })
  }
  


}


