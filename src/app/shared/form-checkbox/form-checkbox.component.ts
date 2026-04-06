import { Component, input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.css'],
  imports: [MatCheckboxModule, ReactiveFormsModule],
})
export class FormCheckboxComponent{
  title = input.required<string>();
  control = input.required<FormControl>();
}
