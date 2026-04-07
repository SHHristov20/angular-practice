import { Component, inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { NewEmployeeDto } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../shared/confirm-dialog/dialog.service';
import { FormInputComponent } from '../../shared/form/form-input/form-input.component';
import { FormDatepickerComponent } from '../../shared/form/form-datepicker/form-datepicker.component';
import { FormCheckboxComponent } from '../../shared/form/form-checkbox/form-checkbox.component';
import { PrimaryButtonDirective } from '../../shared/directives/button/primary-button.directive';
import { SecondaryButtonDirective } from '../../shared/directives/button/secondary-button.directive';
import { DepartmentService } from '../../departments/department.service';
import { FormSelectComponent } from '../../shared/form/form-select/form-select.component';

@Component({
  selector: 'app-new-employee',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    FormDatepickerComponent,
    FormCheckboxComponent,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    FormSelectComponent,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    department: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    startDate: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    salary: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    }),
    status: new FormControl(true),
  });
  employeeService = inject(EmployeeService);
  departmentService = inject(DepartmentService);
  dialogService = inject(DialogService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private editMode = false;
  private employeeId: number | null = null;

  ngOnInit(): void {
    this.loadEmployeeIfEditing();
  }

  get departmentsSelectOptions() {
    return this.departmentService.getAll().map((d) => ({
      value: d.id.toString(),
      viewValue: `${d.id}: ${d.name}`,
    }));
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.editMode && this.employeeId) {
      const updatedEmployee: NewEmployeeDto = {
        ...value,
        status: value.status ? 'active' : 'inactive',
        departmentId: Number(value.department),
        department: this.departmentService.getById(Number(value.department)),
      };

      this.employeeService.edit(this.employeeId, updatedEmployee);
      this.router.navigate(['/employees']);
    }

    const newEmployee: NewEmployeeDto = {
      ...value,
      status: value.status ? 'active' : 'inactive',
      departmentId: Number(value.department),
      department: this.departmentService.getById(Number(value.department)),
    };
    this.employeeService.add(newEmployee);
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

  private loadEmployeeIfEditing(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const employeeId = Number(idParam);
    const employee = this.employeeService.getById(employeeId);

    if (!employee) return;

    const { id, expanded, departmentId, ...employeeData } = employee;

    this.editMode = true;
    this.employeeId = employeeId;

    this.form.setValue({
      ...employeeData,
      status: employee.status === 'active',
      department: employee.departmentId.toString(),
    });
  }
}
