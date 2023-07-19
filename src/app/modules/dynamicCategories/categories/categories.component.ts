import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteCategoryDialogComponent } from 'src/app/dialogs/delete-category-dialog/delete-category-dialog.component';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';
import { CsvExportService } from 'src/app/shared/csv-export/csv-export.service';

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
    'Current value',
    'actions',
  ];
  userId: string | any;
  error: string;
  emptyMessage: string;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private csvExportService: CsvExportService,
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
      .subscribe((categories) => {
        this.categories = categories;
        if (this.categories.length == 1) {
          //if the user has no alerts, i show a message that the user should create an alert
          this.emptyMessage =
            "You don't have any categories yet. Create categories by clicking the 'Add Category' button.";
        } else {
          this.emptyMessage = '';
        }
      });
  }

  addCategory() {
    this.router.navigate(['/dynamic_categories/category/addCategory']);
  }

  modifyCategory(categoryId: string) {
    this.router.navigate([
      '/dynamic_categories/category/modifyCategory',
      categoryId,
    ]);
  }

  deleteCategory(catgId: string, catgName: string) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: catgName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(catgId).subscribe(
          (category) => {
            this.getCategories(); //after deleting the category, we refresh our list of caregories to get the latest changes
          },
          (error) => {
            this.error =
              'Error: ' + error.error.message + '\n.Please try again';
            console.error(error);
          }
        );
      } else {
        //we dont do anything when dialog is closed
      }
    });
  }

  exportTable() {
    if (this.categories.length !== 0) {
      let data = this.categories.map((row) => ({
        Category: row.name,
        'Minimum Value': row.name,
        'Maximum Value': row.maxValue,
        'Current Value': row.current_value,
      }));

      this.csvExportService.downloadCSV(data, 'categories.csv');
    }
  }
}
