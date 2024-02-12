import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css'],
})
export class CandidatesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.authService.getAllCandidate().subscribe((candidates) => {
      this.dataSource.data = candidates;
    });
  }

  editCandidate(id: number) {
    this.router.navigate(['/candidate/updatecandidate/', id]);
  }

  deleteCandidate(id: number) {
    this.authService.deleteCandidateById(id).subscribe((data) => {
      this.loadCandidates();
    });
  }
}
