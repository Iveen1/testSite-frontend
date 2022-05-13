import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {AttachmentService} from "../../services/attachment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  page: number=0;
  products: Array<any> = [];
  pages: Array<number> = [];
  constructor(private userService: UserService, public attachmentService: AttachmentService, private router: Router, private route: ActivatedRoute) { }

  redirectToProduct(productId: number) {
    this.router.navigate(["/products/"+productId]).then(() => {
      window.location.reload();
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(item => {
      this.page = item['page'];
      if (item['page'] == undefined){
        this.page = 0;
      } else {
        this.page = item['page'];
      }
    })
    this.getProducts();
  }

  getProducts() {
    this.userService.getFavorites(this.page).subscribe(
      products=>{
        // @ts-ignore
        products['content'].forEach(product =>{
          if (product['photo'] != null){
            try {
              // @ts-ignore
              product['photo'] = this.attachmentService.getAttachmentNew(product['photo']['path']);
            } catch {
              // @ts-ignore
              product['photo'] = '';
            }
          }

        });
        // @ts-ignore
        this.products = products['content'];
        // @ts-ignore
        this.pages = new Array(products['totalPages']);
      },
      error => {
        console.log('sdfggsdg');
        console.log(error);
      }
    );
  }
}
