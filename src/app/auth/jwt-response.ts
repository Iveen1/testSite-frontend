export class JwtTokenResponse {
  token: string;
  username: string;
  roles: string[];

  constructor(token: string, username: string, roles: string[]) {
    this.token = token;
    this.username = username;
    this.roles = roles;
  }
}
