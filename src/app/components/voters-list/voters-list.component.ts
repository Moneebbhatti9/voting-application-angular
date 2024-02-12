import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/Auth.service';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voters-list',
  templateUrl: './voters-list.component.html',
  styleUrls: ['./voters-list.component.css'],
})
export class VotersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  dataSource = new MatTableDataSource<any>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.authService.getAllVoter().subscribe((voters) => {
      this.dataSource.data = voters;
    });
  }

  editVoter(id: number) {
    this.router.navigate(['voter/updatevoter/', id]);
  }

  deleteVoter(id: number) {
    this.authService.deleteVoterById(id).subscribe((data) => {
      this.loadCandidates();
    });
  }
}
