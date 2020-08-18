import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ApiResult, countryCodes } from '../countryCodes.model';
import { AuthenticationService } from '../authentication.service';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  country_code_lookup_id: number;
  submitted = false;
  selected = 1;
  countryCodes: countryCodes[] = [];

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private auth: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.CountryCodes();
    console.log(this.countryCodes);
  }
  get f() {
    return this.loginForm.controls;
  }
  CountryCodes() {
  this.loginService.getCounteryCodes().subscribe(response => {
    if (response.status_code === 200) {
      this.countryCodes = response.data;
    } else {
    }
  });
}
selectOption(id) {
  this.country_code_lookup_id = id.target.value;
}
onSubmit() {
  if (this.loginForm.invalid) {
      return;
  }
  this.auth.login(this.loginForm.get('phone').value, this.country_code_lookup_id , this.loginForm.get('password').value)
      .subscribe(
          data => {
              if (data.status_code === 200) {
              Cookie.set('user', JSON.stringify(data.data));
              this.router.navigate(['profile/' + data.data.id]);
              } else if ( data.status_code === 601) {
                console.log(data.message);
                this.message = '! عذرا، الادخال الذي قمت به خاطئ';
              } else if (data.status_code === 624) {
                console.log(data.data.message);
                this.message = ' ! عذرا، لقد تجاوزت الحد المطلوب ';
              } else {
                this.message = 'الرجاء ادخال مقدمة البلد'
              }
          });
}
signUp() {
  this.router.navigate(['registration']);
}
}
