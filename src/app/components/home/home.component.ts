import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionService } from 'src/app/services/Position.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private ps: PositionService) {}

  citydata: any = [];
  countrydata: any = [];

  selectedCityPosition: string = '';
  selectedCountryPosition: string = '';
  filteredCityData: any[] = [];
  filteredCountryData: any[] = [];
  uniqueCityPositions: string[] = [];
  uniqueCountryPositions: string[] = [];

  ngOnInit() {
    this.cityResult();
    this.countryResult();
  }

  applyCityFilter() {
    this.filteredCityData = this.citydata.filter(
      (candidate: any) =>
        this.selectedCityPosition === '' ||
        candidate.cityPosition === this.selectedCityPosition
    );
  }

  applyCountryFilter() {
    this.filteredCountryData = this.countrydata.filter(
      (candidate: any) =>
        this.selectedCountryPosition === '' ||
        candidate.countryPosition === this.selectedCountryPosition
    );
  }

  getCityTableData(): any[] {
    return this.filteredCityData.length > 0
      ? this.filteredCityData
      : this.citydata;
  }

  getCountryTableData(): any[] {
    return this.filteredCountryData.length > 0
      ? this.filteredCountryData
      : this.countrydata;
  }

  cityResult() {
    this.ps.getAllAppliedCityCandidates().subscribe((res) => {
      this.citydata = res;
      this.updateUniqueCityPositions();
    });
  }

  countryResult() {
    this.ps.getAllAppliedCountryCandidates().subscribe((res) => {
      this.countrydata = res;
      this.updateUniqueCountryPositions();
    });
  }

  private updateUniqueCityPositions() {
    this.uniqueCityPositions = this.getUniquePositions(
      this.citydata,
      'cityPosition'
    );
  }

  private updateUniqueCountryPositions() {
    this.uniqueCountryPositions = this.getUniquePositions(
      this.countrydata,
      'countryPosition'
    );
  }

  private getUniquePositions(data: any[], positionKey: string): string[] {
    const positions: string[] = [];
    data.forEach((candidate: any) => {
      const position = candidate[positionKey];
      if (position && !positions.includes(position)) {
        positions.push(position);
      }
    });
    return positions;
  }
}
