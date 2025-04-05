import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserSuggestion } from '../../interfaces/UserSuggestion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchOptions = [{label : 'Nearby photographers', click : ''}];
  suggestions : any = [];
  inputText : string = '';
  displaySuggestions : boolean = false;

  private userService = inject(UserService);
  private router = inject(Router);

  onInput() : void {
    const formData = new FormData();
    formData.append('keyword', this.inputText);
    console.log('suggesting using : ', this.inputText);
    this.userService.suggestUsingKeyword(formData)
      .subscribe({
        next : (result) => {
          if (result.ok) {
            this.suggestions = result.body.map((suggestion: UserSuggestion) => ({
              user_name: suggestion.user_name,
              click: () => {
                this.router.navigate(['/user-profile', suggestion.user_id])}
            }));
          }
          else {
            console.error('no suggestions');
          }
        },
        error : (err) => {
          console.log("Error suggesting users : ", err);
        }
      });
  }

  onBlur() : void {
    this.displaySuggestions = false;
  }

  onFocus() : void {
    this.displaySuggestions = true;
  }

}
