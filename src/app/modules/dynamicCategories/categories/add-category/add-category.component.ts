import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  error: string;
  public minValueError: string;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        max_value: new FormControl('', Validators.required),
        min_value: new FormControl('', Validators.required),
      },
      this.minLessThanMaxValidator
    );
    this.categoryForm.controls['min_value'].valueChanges.subscribe(() => {
      this.checkMinValue();
    });
  
    this.categoryForm.controls['max_value'].valueChanges.subscribe(() => {
      this.checkMinValue();
    });
  }
  
  checkMinValue(): void {
    const min = this.categoryForm.controls['min_value'].value;
    const max = this.categoryForm.controls['max_value'].value;
    if (min && max && min > max) {
      this.categoryForm.controls['min_value'].setErrors({ minGreater: true });
    }
  }
  checkMaxValue(): void {
    const min = this.categoryForm.controls['min_value'].value;
    const max = this.categoryForm.controls['max_value'].value;
    if (min && max && min > max) {
      this.categoryForm.controls['max_value'].setErrors({ minGreater: true });
    }
  }

  minLessThanMaxValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const min = group.controls['min_value'].value;
    const max = group.controls['max_value'].value;
    return min < max ? null : { minGreater: true };
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let categoryData = this.categoryForm.value;
      console.log('categoryData: ', categoryData);
      let newCategory: Category = {
        name: categoryData.name,
        maxValue: categoryData.max_value,
        minValue: categoryData.min_value,
      };
      console.log('new category: ', newCategory);

      this.categoryService.createCategory(newCategory).subscribe(
        (newCatg) => {
          console.log('New Category: ', newCatg);
          this.router.navigate(['/dynamic_categories/category']);
        },
        (error) => {
          this.error = 'Error: ' + error.error.message + '';
          console.error(error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/dynamic_categories/category']);
  }
}
