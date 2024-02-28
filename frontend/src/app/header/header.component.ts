import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public openGitHubPage() {
    window.open("https://github.com/RenvezWilliam", "_blank");
  }
}
