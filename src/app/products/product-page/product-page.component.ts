import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AttachmentService} from "../../services/attachment.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  id: number = 0;
  product: any = null;
  title: string = '';
  name: string = '';
  photo: string = '';
  isFavorite: boolean = false;
  constructor(private productService: ProductService, public attachmentService: AttachmentService, private userServise: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(item => {
      if (item['id'] == undefined){
        this.router.navigate(['404']);
      } else {
        this.id = item['id'];
      }
    })
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductById(this.id).subscribe(
      product=>{
        // @ts-ignore
        this.id = product['id'];
        // @ts-ignore
        this.name = product['name'];
        // @ts-ignore
        this.title = product['title'];
        this.userServise.isFavorite(this.id).subscribe(data =>{
          // @ts-ignore
          this.isFavorite = data['response'];
        }, error => {
          console.log('errorrrr')
          console.log(error)
        })

        // @ts-ignore
        if (product['photo'] != null){
          try {
            // @ts-ignore
            this.photo = this.attachmentService.getAttachmentNew(product['photo']['path']);
          } catch {
            this.photo = '';
          }
        }
        this.product = product;
      },
      error => {
        this.router.navigate(['404']);
      });

    }

  addToFavorites(productId: number) {
    this.userServise.addToFavorites(productId).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => {
      console.log(error)
    })
  }

  remFromFavorites(productId: number) {
    this.userServise.removeFromFavorites(productId).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => {
      console.log(error)
    })
  }

}
