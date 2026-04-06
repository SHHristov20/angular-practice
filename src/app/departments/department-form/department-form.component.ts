import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { NewDepartmentDto } from '../department.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../shared/confirm-dialog/dialog.service';
import { FormInputComponent } from '../../shared/form/form-input/form-input.component';
import { PrimaryButtonDirective } from '../../shared/directives/button/primary-button.directive';
import { SecondaryButtonDirective } from '../../shared/directives/button/secondary-button.directive';
import { FormTextareaComponent } from "../../shared/form/form-textarea/form-textarea.component";

@Component({
  selector: 'app-new-department',
  providers: [],
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    FormTextareaComponent
],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css',
})
export class DepartmentFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    location: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    budget: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    }),
  });
  departmentService = inject(DepartmentService);
  dialogService = inject(DialogService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private editMode = false;
  private departmentId: number | null = null;

  ngOnInit(): void {
    this.loadDepartmentIfEditing();
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.editMode && this.departmentId) {
      const updatedDepartment: NewDepartmentDto = {
        ...value,
        createdAt: new Date(),
      };

      this.departmentService.edit(this.departmentId, updatedDepartment);
      this.router.navigate(['/departments']);
    }

    const newDepartment: NewDepartmentDto = {
      ...value,
      createdAt: new Date(),
    };
    this.departmentService.add(newDepartment);
    this.form.reset();
    this.router.navigate(['/departments']);
  }

  onCancel() {
    const title = 'Cancel';
    const message = 'You have unsaved changes. Are you sure you want to leave this page?';

    this.dialogService.openDialog(title, message).subscribe((confirmed) => {
      if (!confirmed) return;

      this.form.reset();
      this.router.navigate(['/departments']);
    });
  }

  private loadDepartmentIfEditing(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const departmentId = Number(idParam);
    const department = this.departmentService.getById(departmentId);

    if (!department) return;

    const { id, expanded, createdAt, ...departmentData } = department;

    this.editMode = true;
    this.departmentId = departmentId;

    this.form.setValue({
      ...departmentData,
    });
  }
}
