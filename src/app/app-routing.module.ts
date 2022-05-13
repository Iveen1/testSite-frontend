import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProductsComponent} from "./products/products.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProductPageComponent} from "./products/product-page/product-page.component";
import {UserComponent} from "./user/user.component";
import {AuthGuard} from "./services/auth/auth-guard";
import {FavoritesComponent} from "./products/favorites/favorites.component";
import {AdminComponent} from "./admin/admin.component";
import {GreetingComponent} from "./greeting/greeting.component";

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductPageComponent
  },
  {
    path: 'my/profile',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my/favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: GreetingComponent
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
