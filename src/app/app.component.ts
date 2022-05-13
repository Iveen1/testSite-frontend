import { Component } from '@angular/core';
import {TokenStorageService} from "./services/auth/token-storage.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoaded: boolean = false;
  roles: Array<string> = [];
  constructor(private tokenStorage: TokenStorageService, private userService: UserService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken() != null) {
      this.userService.getMyInfo().subscribe(
        data => {
          try {
            console.log('data')
            console.log(data)
            this.tokenStorage.updatePersonality(data);
            console.log('update localstorage')
            console.log(this.tokenStorage.getAll());
            this.isLoaded = true;
          } catch {
            this.tokenStorage.updatePersonality(data);
            window.location.reload();
          }
        }, error => {
          console.log('error')
          if(error.status === 401){
            console.log("unauth")
            this.logOut();
          };
        }
      )
    }
    console.log(this.tokenStorage.getRoles());
    this.roles = this.tokenStorage.getRoles();
  }

  logOut() {
    this.tokenStorage.clear();
    window.location.reload();
  }
}
