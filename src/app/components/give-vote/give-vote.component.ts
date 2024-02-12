import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PositionService } from 'src/app/services/Position.service';
import { appliedPosition } from './../interfaces/candidate.interface';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

interface Candidate {
  id: number;
  voteCount: number;
  // other properties
}

@Component({
  selector: 'app-give-vote',
  templateUrl: './give-vote.component.html',
  styleUrls: ['./give-vote.component.css'],
})
export class GiveVoteComponent implements OnInit {
  displayedCityColumns: string[] = [
    'id',
    'name',
    'party',
    'appliedPosition',
    'city',
    'actions',
  ];
  displayedCountryColumns: string[] = [
    'id',
    'name',
    'party',
    'appliedPosition',
    'actions',
  ];
  citydataSource = new MatTableDataSource<any>();
  countrydataSource = new MatTableDataSource<any>();
  showcityTable: boolean = false;
  showcountryTable: boolean = false;

  cityAppliedCandidates: any = [];
  countryAppliedCandidates: any = [];

  uniqueCityPositions: any = [];
  uniqueCountryPositions: any = [];
  uniqueCities: any = [];

  selectedCityPosition: any = '';
  selectedCountryPosition: any = '';
  selectedCity: any = '';

  toggleTable(type: string) {
    if (type === 'city') {
      this.showcityTable = true;
      this.showcountryTable = false;
    } else if (type === 'country') {
      this.showcountryTable = true;
      this.showcityTable = false;
    }
  }
  constructor(
    private router: Router,
    private ps: PositionService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCityPositionCandidates();
    this.getCountryPositionCandidates();
    this.cityElectionFilter();
    this.countryElectionFilter();
  }

  getCityPositionCandidates() {
    this.ps.getAllAppliedCityCandidates().subscribe((res) => {
      this.cityAppliedCandidates = res;
      this.citydataSource.data = res;
    });
  }
  getCountryPositionCandidates() {
    this.ps.getAllAppliedCountryCandidates().subscribe((res) => {
      this.countryAppliedCandidates = res;
      this.countrydataSource.data = res;

      console.log('first', this.countryAppliedCandidates);
    });
  }

  cityElectionFilter() {
    this.ps.getAllCityPositions().subscribe((res) => {
      const cityPositionsSet = new Set<string>();
      const citiesSet = new Set<string>();

      res.forEach((pos: any) => {
        cityPositionsSet.add(pos.name);
        citiesSet.add(pos.cityName);
      });

      this.uniqueCityPositions = Array.from(cityPositionsSet);
      this.uniqueCities = Array.from(citiesSet);
    });
  }

  countryElectionFilter() {
    this.ps.getAllCountryPositions().subscribe((res) => {
      const countryPositionsSet = new Set<string>();

      res.forEach((pos: any) => {
        countryPositionsSet.add(pos.name);
      });

      this.uniqueCountryPositions = Array.from(countryPositionsSet);
    });
  }

  applyCityFilter() {
    this.citydataSource.data = this.cityAppliedCandidates.filter(
      (candidate: any) => {
        return (
          (this.selectedCityPosition === '' ||
            candidate.cityPosition === this.selectedCityPosition) &&
          (this.selectedCity === '' || candidate.cityName === this.selectedCity)
        );
      }
    );
  }

  applyCountryFilter() {
    this.countrydataSource.data = this.countryAppliedCandidates.filter(
      (candidate: any) => {
        return candidate.countryPosition === this.selectedCountryPosition;
      }
    );
  }

  findCandidateById(candidateId: string) {
    const candidate =
      this.cityAppliedCandidates.find(
        (candidate: any) => candidate.id === candidateId
      ) ||
      this.countryAppliedCandidates.find(
        (candidate: any) => candidate.id === candidateId
      );
    return candidate;
  }

  getCandidateUrl(candidate: any): string {
    const baseUrl = 'http://localhost:3000/';
    const collectionName = candidate.cityPosition
      ? 'citylevelCandidates'
      : 'countrylevelCandidates';
    return `${baseUrl}${collectionName}/${candidate.id}`;
  }

  giveVote(candidateId: string) {
    const userEmail = sessionStorage.getItem('userEmail');
    const candidate = this.findCandidateById(candidateId);

    if (userEmail && candidate) {
      const hasVotedForPosition = this.checkIfUserVotedForPosition(
        userEmail,
        candidate.cityPosition
      );

      if (!hasVotedForPosition) {
        const url = this.getCandidateUrl(candidate);
        candidate.voteCount = candidate.voteCount + 1;
        candidate.userEmail = userEmail;
        const updatedCandidate = { ...candidate };

        this.http.put(url, updatedCandidate).subscribe(() => {
          this.toastr.success(`You Voted ${candidate.name} successfully`);
        });
      } else {
        this.toastr.warning(`You have already voted for this position`);
      }
    } else {
      console.error(
        'User email or candidate not found:',
        userEmail,
        candidateId
      );
    }
  }

  checkIfUserVotedForPosition(userEmail: string, position: string): boolean {
    const votedCandidates = [
      ...this.cityAppliedCandidates,
      ...this.countryAppliedCandidates,
    ];
    return votedCandidates.some(
      (candidate) =>
        candidate.userEmail === userEmail && candidate.cityPosition === position
    );
  }
}
