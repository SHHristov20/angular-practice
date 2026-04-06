import { Component, inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { NewEmployeeDto } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../shared/confirm-dialog/dialog.service';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormDatepickerComponent } from '../../shared/form-datepicker/form-datepicker.component';
import { FormCheckboxComponent } from '../../shared/form-checkbox/form-checkbox.component';

@Component({
  selector: 'app-new-employee',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    FormDatepickerComponent,
    FormCheckboxComponent,
  ],
  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',
})
export class NewEmployee implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    startDate: new FormControl(new Date(), [Validators.required]),
    status: new FormControl(true),
  });
  employeeService = inject(EmployeeService);
  dialogService = inject(DialogService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private editMode = false;
  private employeeId: number | null = null;

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.editMode = true;
      this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    }

    if (this.employeeId !== null) {
      const employee = this.employeeService.getEmployeeById(this.employeeId);
      if (employee) {
        this.form.setValue({
          name: employee.name,
          department: employee.department,
          startDate: employee.startDate,
          status: employee.status === 'active',
        });
      }
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.editMode && this.employeeId) {
      const updatedEmployee: NewEmployeeDto = {
        name: this.form.value.name!,
        department: this.form.value.department!,
        startDate: this.form.value.startDate!,
        status: this.form.value.status! ? 'active' : 'inactive',
      };
      this.employeeService.editEmployee(this.employeeId, updatedEmployee);
      this.router.navigate(['/employees']);
      return;
    }

    const newEmployee: NewEmployeeDto = {
      name: this.form.value.name!,
      department: this.form.value.department!,
      startDate: this.form.value.startDate!,
      status: this.form.value.status! ? 'active' : 'inactive',
    };
    this.employeeService.addEmployee(newEmployee);
    this.form.reset();
    this.router.navigate(['/employees']);
  }

  onCancel() {
    const title = 'Cancel';
    const message = 'You have unsaved changes. Are you sure you want to leave this page?';

    this.dialogService.openDialog(title, message).subscribe((confirmed) => {
      if (!confirmed) return;

      this.form.reset();
      this.router.navigate(['/employees']);
    });
  }
}
