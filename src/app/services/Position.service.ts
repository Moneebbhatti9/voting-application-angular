import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { Position } from '../components/interfaces/position.interface';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient, private router: Router) {}

  baseurl = 'http://localhost:3000';

  getAllPositions(): Observable<any[]> {
    const cityPosition = this.http.get<any[]>(
      `${this.baseurl}/city-level-positions`
    );
    const countryPosition = this.http.get<any[]>(
      `${this.baseurl}/country-level-positions`
    );

    return forkJoin([cityPosition, countryPosition]).pipe(
      map(([cityPosition, countryPosition]) => {
        return [...cityPosition, ...countryPosition];
      })
    );
  }

  addCityPosition(cityPosition: Position): Observable<Position> {
    const url = `${this.baseurl}/city-level-positions`;
    return this.http.post<Position>(url, cityPosition);
  }
  getAllCityPositions(): Observable<any> {
    const url = `${this.baseurl}/city-level-positions`;
    return this.http.get<any>(url);
  }

  addCountryPosition(countryPosition: Position): Observable<Position> {
    const url = `${this.baseurl}/country-level-positions`;
    return this.http.post<Position>(url, countryPosition);
  }

  getAllCountryPositions(): Observable<any> {
    const url = `${this.baseurl}/country-level-positions`;
    return this.http.get<any>(url);
  }

  applyForCityPosition(appliedCandidate: any): Observable<any> {
    const url = `${this.baseurl}/citylevelCandidates`;
    return this.http.post<any>(url, appliedCandidate);
  }
  applyForCountryPosition(appliedCandidate: any): Observable<any> {
    const url = `${this.baseurl}/countrylevelCandidates`;
    return this.http.post<any>(url, appliedCandidate);
  }

  getAllAppliedCityCandidates(): Observable<any> {
    const url = `${this.baseurl}/citylevelCandidates`;
    return this.http.get<any>(url);
  }
  getAllAppliedCountryCandidates(): Observable<any> {
    const url = `${this.baseurl}/countrylevelCandidates`;
    return this.http.get<any>(url);
  }
}
