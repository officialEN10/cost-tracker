import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dynamic-categories-parent',
  templateUrl: './dynamic-categories-parent.component.html',
  styleUrls: ['./dynamic-categories-parent.component.scss'],
})
export class DynamicCategoriesParentComponent implements OnInit {
  selectedIndex = 0;
  links = ['expenses', 'category'];
  activeLink = this.links[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
    //we subscribe to the routers events to keep track of any changes in the router state
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        //if change is of type navigationEnd
        if (event instanceof NavigationEnd) {
          this.selectedIndex = this.router.url.includes('category') ? 1 : 0; //we compare the actual url after the nav ends with the login url
          console.log('selectedIndex ', this.selectedIndex);
        }
      });
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.router.navigate(['dynamic_categories/expenses']);
        break;
      case 1:
        this.router.navigate(['dynamic_categories/category']);
        break;
    }
  }
}
