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
  private authenticationService: AuthenticationService;

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.authenticationService = this.injector.get(AuthenticationService);

    if (request.url.includes('/login')) {

      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json"
        }
      });
    } else if (request.url.includes('/fasta-file-parser')) {
      const token: string = this.authenticationService.getToken();

      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
    } else {
      const token: string = this.authenticationService.getToken();

      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json"
        }
      });
    }

    return next.handle(request);
  }
}
