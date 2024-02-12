import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/Auth.service';
import { PositionService } from 'src/app/services/Position.service';

@Component({
  selector: 'app-Election-position-list',
  templateUrl: './Election-position-list.component.html',
  styleUrls: ['./Election-position-list.component.css'],
})
export class ElectionPositionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'position', 'city'];

  dataSource = new MatTableDataSource<any>();

  constructor(private ps: PositionService) {}

  ngOnInit() {
    this.loadPositions();
  }

  loadPositions() {
    this.ps.getAllPositions().subscribe((position) => {
      this.dataSource.data = position;
      console.log(this.dataSource.data);
    });
  }
}
