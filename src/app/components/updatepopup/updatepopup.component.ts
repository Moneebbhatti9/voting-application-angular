import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  candidates: any = [];
  candidate: any;
  val: any;
  ngOnInit(): void {
    let sub = this.activatedRoute.params.subscribe((params) => {
      this.val = params['id'];
    });

    console.log('Id' + this.val);
    this.authService
      .getCandidateById(this.val)
      .subscribe((data) => (this.candidate = data));
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  registerForm = this.formBuilder.group(
    {
      name: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      registerAs: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control(
        '',
        Validators.compose([Validators.required])
      ),
      confirmPassword: this.formBuilder.control('', Validators.required),
    },
    {
      validator: this.passwordMatchValidator.bind(this),
    }
  );

  updateUser() {
    this.authService.updateCandidate(this.candidate).subscribe((data) => {});
    this.getCandidate(this.candidate.id);
    this.toastr.success('Candidate updated successfully');
    this.router.navigate(['/candidate/listing']);
  }

  getCandidate(id: number) {
    this.authService.getAllCandidate().subscribe((res) => {
      this.candidate = res;
    });
  }
}
