import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Credential, User } from '../../model/user.model';
import { AuthenticationServiceApi } from '../auth.service.api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceMock extends AuthenticationServiceApi {
  login(credential: Credential): Observable<User> {
    if (credential.username !== 'test' && credential.username !== 'ngrx') {
      return throwError('Invalid username or password');
    }

    return of({
      id: 'mock-id',
      name: 'User',
      token: 'alskdfjlwiuoejflskjd',
      refreshToken: 'refresh token',
    }).pipe(delay(3000));
  }
  constructor() {
    super();
  }
}
