import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/auth/token-storage.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  info: any;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log('main comp');
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      roles: this.tokenStorage.getRoles()
    };
  }
}
