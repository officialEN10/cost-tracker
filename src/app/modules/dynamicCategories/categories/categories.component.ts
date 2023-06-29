import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/entities/category';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        this.userService
          .getCategoriesOfUser(this.userId)
          .subscribe((categories) => (this.categories = categories));
      }
    });
  }

  modifyCategory(categoryId: string) {}
  deleteCategory(categoryId: string) {}
  addCategory() {}
}
