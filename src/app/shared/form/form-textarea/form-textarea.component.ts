import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-textarea',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form-textarea.component.html',
  styleUrl: './form-textarea.component.css',
  host: {
    class: 'block mb-4',
  },
})
export class FormTextareaComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  errorMessage = input<string>('This field is required');
}
