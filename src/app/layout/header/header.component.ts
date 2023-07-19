import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: User | null;
  isLoginPage: boolean = true;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    //we see if the user is logged in or no
    this.userService.user.subscribe((logged_user) => {
      this.user = logged_user;
    });
    //we see if we are supposed to be
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
    this.isLoginPage = true;
  }

  ngAfterViewInit() {
    // console.log(this.sidenav); // just for debugging
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}
