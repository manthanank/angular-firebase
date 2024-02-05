import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  firstName?: string,
  lastName?: string,
  key?: string; // Add a key property for identifying users
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://angular-firebase-rest-api-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  // Example GET request
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users.json`);
  }

  // Example POST request
  addUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users.json`, user);
  }

  // Example PUT request for updating user
  updateUser(user: User): Observable<any> {
    const { key, ...userWithoutKey } = user; // Remove key from user object
    return this.http.put(`${this.apiUrl}/users/${key}.json`, userWithoutKey);
  }

  // Example DELETE request
  deleteUser(key: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${key}.json`);
  }
}
