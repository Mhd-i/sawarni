import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarMainComponent } from '../explore-navbar/navbar-main/navbar-main.component';

import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-explore-page',
  imports: [NavbarMainComponent, RouterOutlet, SearchBarComponent],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})
export class ExplorePageComponent {

}
