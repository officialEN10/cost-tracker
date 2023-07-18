import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modify-category',
  templateUrl: './modify-category.component.html',
  styleUrls: ['./modify-category.component.scss'],
})
export class ModifyCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  userId: string | any;
  categoryId: string;
  categoryToUpdate: Category;
  isLoading = false; // for spinner use
  error: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // We set loading to true when retrieving data
    this.isLoading = true;

    // We extract the category id from the url
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.getCategory(this.categoryId).subscribe((category) => {
      this.categoryToUpdate = category;

      // We get all the categories of the user
      this.userService.user.subscribe(
        (loggedUser) => {
          if (loggedUser) {
            // We make sure loggedUser is not null
            this.userId = loggedUser._id;

            // We fill the form with data from the server
            this.categoryForm = new FormGroup({
              name: new FormControl(
                this.categoryToUpdate.name,
                Validators.required
              ),
              max_value: new FormControl(
                this.categoryToUpdate.maxValue,
                Validators.required
              ),
              min_value: new FormControl(
                this.categoryToUpdate.minValue,
                Validators.required
              ),
            });
            console.log('categoryToUpdate: ', this.categoryToUpdate);

            this.isLoading = false; // When we got data, we stop showing the spinner and show the data
          }
        },
        (err) => {
          this.isLoading = false;
        }
      );
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let categoryData = this.categoryForm.value;
      let updatedCategory: Category = {
        name: categoryData.name,
        maxValue: categoryData.max_value,
        minValue: categoryData.minValue,
      };

      this.categoryService
        .updateCategory(this.categoryId, updatedCategory)
        .subscribe(
          (newUpdatedCategory) => {
            console.log(newUpdatedCategory);
            this.router.navigate(['/dynamic_categories/category']);
          },
          (error) => {
            this.error =
              'Error: ' + error.error.message +'';
            console.error(error);
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(['/dynamic_categories/category']);
  }
}
