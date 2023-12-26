import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Organization } from 'src/app/core/interfaces/interfaces';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSortModule,
    MatSelectModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HeaderComponent,
      multi: true,
    },
  ],
})
export class HeaderComponent implements ControlValueAccessor {
  input!: string;
  onChange: any = () => {};
  dateDirections: string[] = ['Date ascending', 'Date descending'];

  @Output() addItemEvent = new EventEmitter<void>();
  @Output() sortingByDate = new EventEmitter<void>();
  @Input() organsLength!: Organization[];

  constructor() {}

  // Control Value Accessor

  writeValue(input: any): void {
    this.input = input;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  openDialog(): void {
    this.addItemEvent.emit();
  }

  sortByD($event: any): void {
    this.sortingByDate.emit($event);
  }
}
