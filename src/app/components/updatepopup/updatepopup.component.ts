import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  updateForm!: FormGroup;
  candidateId: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.activatedRoute.params.subscribe((params) => {
      this.candidateId = params['id'];
      this.loadCandidateData(this.candidateId);
    });
  }

  loadCandidateData(id: any) {
    this.authService.getCandidateById(id).subscribe((data) => {
      this.updateForm.patchValue({
        name: data.name,
        email: data.email,
      });
    });
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  updateUser() {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      const hashedPassword = bcrypt.hashSync(formData.password, 10);
      formData.password = hashedPassword;

      this.authService.updateCandidate(this.candidateId, formData).subscribe(
        () => {
          this.toastr.success('Candidate updated successfully');
          this.router.navigate(['/candidate/listing']);
        },
        (error) => {
          this.toastr.error('Failed to update candidate');
          console.error(error);
        }
      );
    } else {
      this.toastr.error('Please enter valid data');
    }
  }
}
