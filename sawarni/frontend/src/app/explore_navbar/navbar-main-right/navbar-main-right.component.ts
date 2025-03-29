import { Component } from '@angular/core';
import { DropdownButtonComponent } from '../../dropdown-button/dropdown-button.component';

@Component({
  selector: 'app-navbar-main-right',
  imports: [DropdownButtonComponent],
  templateUrl: './navbar-main-right.component.html',
  styleUrl: './navbar-main-right.component.css'
})
export class NavbarMainRightComponent {
  addContentButtonOptions = [
    {label : 'new Post', onclick : () => {alert("Test")}},
    {label : 'new Equipement', onclick : () => {alert("Test")}},
    {label : 'new Course', onclick : () => {alert("Test")}},
  ];

  settingsButtonOptions = [
    {label : 'Profile', onclick : () => {alert("")}},
    {label : 'Logout', onclick : () => {alert("")}},
  ];
}
