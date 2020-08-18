import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { countryCodes } from '../countryCodes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
countryCodes: countryCodes[] = [];
submitted = false;
message: string;
codeId: number;
registForm: FormGroup;
  constructor(private loginService: LoginService,
              private router: Router,
              private regService: RegisterService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getCountryCodes();
  }
  get f() {
    return this.registForm.controls;
  }
  getCountryCodes() {
    this.loginService.getCounteryCodes().subscribe(data => {
      if (data.status_code === 200) {
        this.countryCodes = data.data;
      }
    });
    console.log(this.countryCodes);
  }
  selectOption(id) {
    this.codeId = id.target.value;
    console.log(this.codeId);
  }
  onSubmit() {
    this.submitted = true;
    if (this.registForm.invalid) {
      return;
    }
    const payload: User = {
        first_name: this.registForm.get('first_name').value,
        last_name: this.registForm.get('last_name').value,
        phone: this.registForm.get('phone').value,
        country_code_lookup_id: this.codeId,
        email: this.registForm.get('email').value,
        password: this.registForm.get('password').value
    };
    this.regService.registUser(payload).subscribe(response => {
      if (response.status_code === 200) {
        console.log(response.data);
        Cookie.set('user', JSON.stringify(response.data));
        this.router.navigate(['profile/' + response.data.id]);
      } else if ( response.status_code === 602) {
              this.message = 'رقم الهاتف المدخل مستخدم';
      }
    });
  }

}
