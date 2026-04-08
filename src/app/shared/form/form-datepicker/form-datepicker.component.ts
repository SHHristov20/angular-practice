import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-form-datepicker',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule],
  templateUrl: './form-datepicker.component.html',
  styleUrl: './form-datepicker.component.css',
  host: {
    class: 'block mb-4',
  },
})
export class FormDatepickerComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  errorMessage = input<string>();
}
