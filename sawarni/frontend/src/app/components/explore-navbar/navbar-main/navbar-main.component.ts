import { Component } from '@angular/core';
import { ContentViewSelectorComponent } from '../content-view-selector/content-view-selector.component';
import { NavbarMainRightComponent } from '../navbar-main-right/navbar-main-right.component';

@Component({
  selector: 'app-navbar-main',
  imports: [ContentViewSelectorComponent, NavbarMainRightComponent],
  templateUrl: './navbar-main.component.html',
  styleUrl: './navbar-main.component.css'
})
export class NavbarMainComponent {
  
}
