import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  isMenuRiquired: boolean = false;
  title = 'voting-system';
  userRole!: string | null;

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole');
  }
  ngDoCheck(): void {
    if (this.router.url === '/login' || this.router.url === '/register') {
      this.isMenuRiquired = false;
    } else {
      this.isMenuRiquired = true;
    }
  }
  logoutUser() {
    this.authService.logout();
  }
}
