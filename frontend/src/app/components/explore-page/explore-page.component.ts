import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarMainComponent } from '../explore-navbar/navbar-main/navbar-main.component';
<<<<<<<< HEAD:sawarni/sawarni/frontend/src/app/components/explore-page/explore-page.component.ts
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-explore-page',
  imports: [NavbarMainComponent, RouterOutlet, SearchBarComponent],
========

@Component({
  selector: 'app-explore-page',
  imports: [NavbarMainComponent, RouterOutlet],
>>>>>>>> 1366346c52bf23312982d221759040a602ac25fd:sawarni/frontend/src/app/components/explore-page/explore-page.component.ts
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})
export class ExplorePageComponent {

}
