import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-button',
  imports: [],
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.css'
})
export class DropdownButtonComponent {
  @Input() label : string = "default";
  @Input() width : string = "100px";
  
  @Input() contents = [
    {label : 'default', onclick : () => {alert("default")}}
  ];
  
  isOpen : boolean = false;

  toggleDropDown() : void {
    this.isOpen = !this.isOpen
  }
}
