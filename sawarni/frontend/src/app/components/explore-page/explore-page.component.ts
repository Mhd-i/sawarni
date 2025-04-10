import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarMainComponent } from '../explore-navbar/navbar-main/navbar-main.component';


@Component({
  selector: 'app-explore-page',
  imports: [RouterOutlet, NavbarMainComponent],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})
export class ExplorePageComponent {

}
