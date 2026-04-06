import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { PrimaryButtonDirective } from '../shared/directives/button/primary-button.directive';
import { SecondaryButtonDirective } from '../shared/directives/button/secondary-button.directive';

@Component({
  selector: 'app-header',
  imports: [RouterLink, PrimaryButtonDirective, SecondaryButtonDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  router = inject(Router);
}
