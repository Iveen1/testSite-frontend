import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { LoginInfo } from '../auth/login-info';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoginFailed = false;
  errorMessage = '';
  // @ts-ignore
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService, private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.redirect();
    }
  }

  onSubmit() {
    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password,
      this.form.roles
    );

    this.authService.login(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.userService.getMyInfo().subscribe(data =>{
          this.tokenStorage.updatePersonality(data);
          this.isLoginFailed = false;
          this.redirect();
        })
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  redirect() {
    this.router.navigate(["/"]).then(() => {
        window.location.reload();
      }
    );
  }
}
