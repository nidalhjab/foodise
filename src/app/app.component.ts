import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'foodsie';
  login = false;
  sideNav = false;
  constructor(private router: Router, private authenticationService: AuthenticationService) {}
  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    if (currentUser) {
      this.login = true;
    } else {
      this.login = false;
    }
  }
  logOut() {
    Cookie.delete('user');
    this.login = false;
    this.authenticationService.logout().subscribe(result => {
      console.log(result);
    });
    this.router.navigate(['login']);
  }
  open() {
    if ( ! this.sideNav) {
     document.getElementById('nav').style.display = 'inline-block';
     this.sideNav = true;
    } else {
      document.getElementById('nav').style.display = 'none';
      this.sideNav = false;
    }
  }

}
