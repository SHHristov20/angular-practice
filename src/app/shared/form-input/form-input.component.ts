import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
  host: {
    class: 'block mb-4',
  },
})
export class FormInputComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  errorMessage = input<string>('This field is required');
}
