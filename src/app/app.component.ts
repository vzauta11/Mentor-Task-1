import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrganizationsListComponent } from './pages/organizations/organizations-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrganizationsListComponent],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'mentorTask';
}
