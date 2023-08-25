import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import {
  IUser,
  IUserResponse,
  IUsersResponse,
} from '@shared/interface/user.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  public getAll(): Observable<IUsersResponse> {
    return this._http
      .get<IUsersResponse>(this._baseUrl + 'user')
      .pipe(catchError(this.errorHandler));
  }

  public find(id: string): Observable<IUserResponse> {
    return this._http
      .get<IUserResponse>(`${this._baseUrl + 'user'}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  public delete(id: number): Observable<IUser> {
    return this._http
      .delete<IUser>(`${this._baseUrl + 'user'}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  public add(user: IUser): Observable<IUsersResponse> {
    return this._http
      .post<IUsersResponse>(`${this._baseUrl + 'user'}`, user)
      .pipe(catchError(this.errorHandler));
  }

  public update(user: IUser): Observable<IUsersResponse> {
    return this._http
      .put<IUsersResponse>(`${this._baseUrl + 'user'}/${user.id}`, user)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
