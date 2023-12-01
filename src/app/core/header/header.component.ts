import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Organization } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HeaderComponent,
      multi: true
    }
  ],
})
export class HeaderComponent implements ControlValueAccessor {


  input!: string;

  onChange: any =()=> { };
  
  dateDirections : string[] = ["Date ascending", "Date descending"];

  @Output() addItemEvent = new EventEmitter<void>();
  @Output() sortingByDate = new EventEmitter<void>();
  @Input() organsLength?: Organization[];


  constructor() {
  }

  

  // Control Value Accessor

  writeValue(input: any): void {
    this.input = input 
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {

  }
  
  setDisabledState?(isDisabled: boolean): void {
  }


  openDialog(): void {
    this.addItemEvent.emit()
    
  }

  sortByD($event: any): void {    
    this.sortingByDate.emit($event)
  }

  





}
