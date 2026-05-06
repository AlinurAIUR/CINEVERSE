import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    private baseUserUrl ='http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  createUser(user:UserService): Observable<UserService> {
      return this.http.post <UserService>(this.baseUserUrl, user)

  }
  checkEmail(email: string): Observable<boolean> {
    return this.http
      .get <UserService[]>(`${this.baseUserUrl}?email=${email}`)
      .pipe(map(users => users.length>0));
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUserUrl);
  }
}
