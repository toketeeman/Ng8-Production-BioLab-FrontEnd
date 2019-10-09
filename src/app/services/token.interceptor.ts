import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthenticationService;
  constructor(private injector: Injector) {}

  /** intercepts any http request and if a token exists, adds it to the Authorization headers
   * @param request: HttpRequest<any>
   * @param next: HttpHandler
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("TokenInterceptor: intercept()");
    this.authService = this.injector.get(AuthenticationService);

    const token: string = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Token: ${token}`,
        "Content-Type": "application/json"
      }
    });
    return next.handle(request);
  }
}
