import { Component } from '@angular/core';
import { PrimaryButtonDirective } from '../shared/directives/button/primary-button.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [PrimaryButtonDirective, RouterLink],
})
export class HomeComponent { }
