import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  // strongPassword: string = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*d).{8,}$/';

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  generateRandomId(): number {
    const random = Math.floor(Math.random() * 1000);
    return random;
  }

  ngOnInit() {}
  registerForm = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      registerAs: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.compose([Validators.required])),
      confirmPassword: this.fb.control('', Validators.required),
    },
    {
      validator: this.passwordMatchValidator.bind(this),
    }
  );

  register() {
    if (this.registerForm.valid) {
      const registerAsValue = this.registerForm.get('registerAs')?.value;
      const email = this.registerForm.get('email')?.value;
      const randomId = this.generateRandomId();

      // const isUserExist = this.authService.checkUserExist(email);

      // if (isUserExist) {
      //   this.toastr.warning('User with this email already exists');
      //   return;
      // }

      const formData = {
        id: randomId,
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        registerAs: registerAsValue,
        password: this.registerForm.get('password')?.value,
      };

      formData.password = bcrypt.hashSync(formData.password, 10);

      if (registerAsValue === 'Candidate') {
        this.authService.registerCandidate(formData).subscribe((res) => {
          this.toastr.success('Successfully registered as Candidate');
          this.router.navigate(['/login']);
        });
      } else {
        this.authService.registerVoter(formData).subscribe((res) => {
          this.toastr.success('Successfully registered as Voter');
          this.router.navigate(['/login']);
        });
      }
    } else {
      this.toastr.warning('Please Enter Valid Data');
    }
  }
}
