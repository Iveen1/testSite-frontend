export class RegisterInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;

  constructor(username: string, email: string, firstName: string, lastName: string, middleName: string, password: string) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.password = password;
  }
}
