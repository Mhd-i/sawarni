import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecentContactsComponent } from '../recent-contacts/recent-contacts.component';
import { ContentViewSelectorComponent } from '../explore-navbar/content-view-selector/content-view-selector.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { SearchBarComponent } from "../search-bar/search-bar.component";


@Component({
  selector: 'app-explore-page',
  imports: [RouterOutlet, SideBarComponent, RecentContactsComponent, ContentViewSelectorComponent, AboutUsComponent, SearchBarComponent],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})
export class ExplorePageComponent {

}
