import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const PERSONALITY_KEY = 'personality';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  private localStorage: Storage;
  constructor() { this.localStorage = window.localStorage; }

  public saveToken(token: string) {
    console.log('im in savetoken');
    console.log(token);
    this.localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, "Bearer " + token);
  }

  public clear() {
    this.localStorage.clear();
  }

  public getToken(): string {
    // @ts-ignore
    return this.localStorage.getItem(TOKEN_KEY);
  }

  public getUsername(): string {
    // @ts-ignore
    return JSON.parse(this.localStorage.getItem(PERSONALITY_KEY))['username'];
  }

  public getEmail(): string {
    // @ts-ignore
    return JSON.parse(this.localStorage.getItem(PERSONALITY_KEY))['email'];
  }

  public getFirstName(): string {
    // @ts-ignore
    return JSON.parse(this.localStorage.getItem(PERSONALITY_KEY))['firstName'];
  }

  public getLastName(): string {
    // @ts-ignore
    return JSON.parse(this.localStorage.getItem(PERSONALITY_KEY))['lastName'];
  }

  public getMiddleName(): string {
    // @ts-ignore
    return JSON.parse(this.localStorage.getItem(PERSONALITY_KEY))['middleName'];
  }

  public getRoles(): string[] {
    this.roles = [];

    if (this.localStorage.getItem(TOKEN_KEY)) {
      // @ts-ignore
      JSON.parse(this.localStorage.getItem(PERSONALITY_KEY))['roles'].forEach(role => {
        this.roles.push(role['name']);
      })
    }
    return this.roles;
  }

  public updatePersonality(object: any) {
    this.localStorage.removeItem(PERSONALITY_KEY);
    this.localStorage.setItem(PERSONALITY_KEY, object);
  }

  public getAvatar(): string {
    // @ts-ignore
    return JSON.parse(this.localStorage.getItem(PERSONALITY_KEY))['avatar']['path'];
  }

  public getAll(): any {
    return this.localStorage.getItem(PERSONALITY_KEY);
  }
}
