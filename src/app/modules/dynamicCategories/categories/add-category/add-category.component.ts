import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      max_value: new FormControl('', Validators.required),
      min_value: new FormControl('', Validators.required),
    });
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
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/dynamic_categories/category']);
  }
}
