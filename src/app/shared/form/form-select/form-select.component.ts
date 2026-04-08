import { Component, input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css'],
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  host: {
    class: 'block mb-4',
  },
})
export class FormSelectComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  options = input.required<{ value: string; viewValue: string }[]>();
  errorMessage = input<string>();
}
