import { Component, OnInit } from '@angular/core';
import {AttachmentService} from "../services/attachment.service";
import {TokenStorageService} from "../services/auth/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FCsInfo} from "../auth/fcs-info";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: any = {};
  username: string = "";
  // firstName: string = "";
  // lastName: string = "";
  // middleName: string = "";
  avatar: string = "";
  url: string = '';
  // @ts-ignore
  file: File;
  // @ts-ignore
  private fcsInfo: FCsInfo;

  constructor(private tokenStorage: TokenStorageService, private attachmentService: AttachmentService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getMyProfile();
  }

  onSubmit() {
    this.fcsInfo = new FCsInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.middleName
    );
    console.log(this.form.username);
    this.updateFCs();
  }
  getMyProfile() {
    this.form.firstName = this.tokenStorage.getFirstName();
    this.form.lastName = this.tokenStorage.getLastName();
    this.form.middleName = this.tokenStorage.getMiddleName();
    try {
      this.avatar = this.attachmentService.getAttachmentNew(this.tokenStorage.getAvatar());
      console.log(this.avatar);
    } catch {
      this.avatar = ''
    };
  }

  selectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
    if(files) {
      var reader = new FileReader();
      // @ts-ignore
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
    this.uploadImage();
  }

  uploadImage() {
    const uploadImage = new FormData();
    uploadImage.append("file", this.file);
    uploadImage.append("type", "AVATAR");
    this.attachmentService.uploadAttachment(uploadImage).subscribe(attachment =>{
      console.log(attachment);
      // @ts-ignore
      this.userService.updateMyAvatar(attachment['id']).subscribe(async status => {
        this.userService.getMyInfo().subscribe(data =>{
          this.tokenStorage.updatePersonality(data);
          window.location.reload();
        })
      }, error => {
        console.log(error);
      });

    });
  }

  updateFCs() {
    this.userService.updateMyInfo(this.fcsInfo).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }
}
