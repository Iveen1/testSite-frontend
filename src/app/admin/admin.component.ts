import { Component, OnInit } from '@angular/core';
import {FCsInfo} from "../auth/fcs-info";
import {TokenStorageService} from "../services/auth/token-storage.service";
import {AttachmentService} from "../services/attachment.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ProductInfo} from "../auth/product-info";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form: any = {};
  username: string = "";
  avatar: string = "";
  // @ts-ignore
  file: File;
  fileId: string = '';
  // @ts-ignore
  private productInfo: ProductInfo;

  constructor(private tokenStorage: TokenStorageService, private attachmentService: AttachmentService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.productInfo = new ProductInfo(
      this.form.name,
      this.form.title,
      this.form.photo
    );
    console.log(this.productInfo)
    this.addProduct();
  }

  selectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
    this.uploadImage();
  }

  uploadImage() {
    const uploadImage = new FormData();
    uploadImage.append("file", this.file);
    uploadImage.append("type", "PRODUCT");
    this.attachmentService.uploadAttachment(uploadImage).subscribe(attachment =>{
      console.log(attachment);
      // @ts-ignore
      this.fileId = attachment['id'];
      console.log('file')
      console.log(this.avatar);
      }, error => {
        console.log(error);
      });
  }

  addProduct() {
    if (this.fileId != ''){
      this.form.photo = {'id': this.fileId};
      this.productInfo = this.form;
    }
    this.productService.addProduct(this.productInfo).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => {
      console.log('error');
      console.log(error);
    });
  }
}
