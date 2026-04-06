import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimaryButtonDirective } from "../shared/directives/button/primary-button.directive";

@Component({
  selector: 'app-header',
  imports: [RouterLink, PrimaryButtonDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
