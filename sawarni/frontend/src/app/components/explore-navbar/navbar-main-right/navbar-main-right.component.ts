import { Component, inject } from '@angular/core';
import { DropdownButtonComponent } from '../../dropdown-button/dropdown-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-main-right',
  imports: [DropdownButtonComponent],
  templateUrl: './navbar-main-right.component.html',
  styleUrl: './navbar-main-right.component.css'
})
export class NavbarMainRightComponent {

  router = inject(Router);

  addContentButtonOptions = [
    {label : 'new Post', onclick : () => {this.router.navigate(['/create-post'])}},
    {label : 'new Equipement', onclick : () => {this.router.navigate(['/add-equipments'])}},
    {label : 'new Course', onclick : () => {alert("Test")}},
  ];

  settingsButtonOptions = [
    {label : 'Profile', onclick : () => {
      this.router.navigate(['/user-profile'])
    }},
    {label : 'Logout', onclick : () => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }},
  ];
}
