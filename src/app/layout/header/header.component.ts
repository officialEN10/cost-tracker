import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User | null;
  isLoginPage: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.user.subscribe((logged_user) => {
      this.user = logged_user;
      // console.log('header component -> user: ', this.user);
    });
    //we subscribe to the routers events to keep track of any changes in the router state
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        //if change is of type navigationEnd
        if (event instanceof NavigationEnd)
          this.isLoginPage = this.router.url.includes('/auth/login'); //we compare the actual url after the nav ends with the login url
      });
  }

  logOut() {
    this.userService.logOut();
    localStorage.clear();
    this.isLoginPage = true;
    this.router.navigate(['/auth/login']);
  }
}
