import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router, Event, NavigationEnd } from '@angular/router';

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
      console.log('header component -> user: ', this.user);
    });
    this.router.events.subscribe((event: Event) => {
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
