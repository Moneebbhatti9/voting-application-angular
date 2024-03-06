import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  baseurl = 'http://localhost:3000';

  getAllUsers(): Observable<any[]> {
    const adminUsers$ = this.http.get<any[]>(`${this.baseurl}/Admin`);
    const voterUsers$ = this.http.get<any[]>(`${this.baseurl}/voters`);
    const candidateUsers$ = this.http.get<any[]>(`${this.baseurl}/candidates`);

    return forkJoin([adminUsers$, voterUsers$, candidateUsers$]).pipe(
      map(([adminUsers, voterUsers, candidateUsers]) => {
        return [...adminUsers, ...voterUsers, ...candidateUsers];
      })
    );
  }

  comparePasswords(
    enteredPassword: string,
    storedPasswordHash: string
  ): Observable<boolean> {
    return new Observable((observer) => {
      bcrypt.compare(enteredPassword, storedPasswordHash, (err, result) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(result);
        }
        observer.complete();
      });
    });
  }

  getAllCandidate(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/candidates`);
  }
  getAllVoter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/voters`);
  }

  getCandidateById(id: number): Observable<any> {
    const url = `${this.baseurl}/candidates/${id}`;
    return this.http.get<void>(url);
  }
  getVoterById(id: number): Observable<any> {
    const url = `${this.baseurl}/voters/${id}`;
    return this.http.get<void>(url);
  }

  registerVoter(userDetails: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/voters`, userDetails);
  }

  registerCandidate(candidateDetails: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/candidates`, candidateDetails);
  }

  updateCandidate(candidate: any, user: any): Observable<void> {
    const url = `${this.baseurl}/candidates/${candidate}`;
    return this.http.put<void>(url, user).pipe(map(() => user));
  }
  updateVoter(voter: any, user: any): Observable<void> {
    const url = `${this.baseurl}/voters/${voter}`;
    return this.http.put<void>(url, user).pipe(map(() => user));
  }

  deleteCandidateById(id: number): Observable<void> {
    const url = `${this.baseurl}/candidates/${id}`;
    return this.http.delete<void>(url);
  }
  deleteVoterById(id: number): Observable<void> {
    const url = `${this.baseurl}/voters/${id}`;
    return this.http.delete<void>(url);
  }

  logout() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRole');

    return this.router.navigate(['/login']);
  }

  checkUserExist(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((users) => users.some((user) => user.email === email))
    );
  }
}
