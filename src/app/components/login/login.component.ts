import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });

  async login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.getAllUsers().subscribe((users: any[]) => {
        const user = users.find((u) => u.email === email);

        if (user && user.password) {
          this.authService
            .comparePasswords(password as string, user.password)
            .subscribe(async (passwordsMatch) => {
              if (passwordsMatch) {
                sessionStorage.setItem('userEmail', user.email);
                sessionStorage.setItem('userRole', user.registerAs);

                setTimeout(() => {
                  if (user.registerAs === 'Admin') {
                    this.toastr.success('Successfully Login as Admin');
                    this.router.navigate(['/home']);
                  } else if (user.registerAs === 'Candidate') {
                    this.toastr.success('Successfully Login as Candidate');
                    this.router.navigate(['/home']);
                  } else {
                    this.toastr.success('Successfully Login as Voter');
                    this.router.navigate(['/home']);
                  }
                }, 3000);
              } else {
                this.toastr.error('Invalid email or password', 'Error');
              }
            });
        } else {
          this.toastr.error('User not found or password not set', 'Error');
        }
      });
    }
  }
}
