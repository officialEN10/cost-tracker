import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteCategoryDialogComponent } from 'src/app/dialogs/delete-category-dialog/delete-category-dialog.component';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  displayedColumns: string[] = [
    'Category',
    'Minimum value',
    'Maximum value',
    'actions',
  ];

  userId: string | any;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        this.getCategories();
      }
    });
  }

  getCategories(): void {
    this.userService
      .getCategoriesOfUser(this.userId)
      .subscribe((categories) => (this.categories = categories));
  }

  addCategory() {
    this.router.navigate(['/dynamic_categories/addCategory']);
  }

  modifyCategory(categoryId: string) {
    this.router.navigate(['/dynamic_categories/modifyCategory', categoryId]);
  }

  deleteCategory(catgId: string, catgName: string) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: catgName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(catgId).subscribe((category) => {
          this.getCategories(); //after deleting the category, we refresh our list of caregories to get the latest changes
        });
      } else {
        //we dont do anything when dialog is closed
      }
    });
  }
}
