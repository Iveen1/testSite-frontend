import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorageService} from "../services/auth/token-storage.service";
import {Observable} from "rxjs";


const TOKEN_HEADER_KEY = 'Authorization';
// нужно для автоматической авторизации
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req;
    const token = this.token.getToken();
    if (token != null) {
      authRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token)})
    }
    return next.handle(authRequest);
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
