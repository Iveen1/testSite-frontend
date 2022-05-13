import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {TokenStorageService} from "../services/auth/token-storage.service";
import {Router} from "@angular/router";
import {RegisterInfo} from "../auth/register-info";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isRegisterFailed = false;
  errorMessage = '';
  // @ts-ignore
  private registerInfo: RegisterInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.redirect();
    }
  }

  onSubmit() {
    this.registerInfo = new RegisterInfo(
      this.form.username,
      this.form.email,
      this.form.firstName,
      this.form.lastName,
      this.form.middleName,
      this.form.password
    );

    this.authService.register(this.registerInfo).subscribe(
      data => {
        console.log(data);
        this.redirect();
      },
      error => {
        console.log(error);
        this.isRegisterFailed = true;
        this.errorMessage = error.error.message;
      }
    );
  }

  redirect() {
    this.router.navigate(["/login"]).then( () =>
      { window.location.reload(); }
    );
  }
}
