import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-updatevoter',
  templateUrl: './updatevoter.component.html',
  styleUrls: ['./updatevoter.component.css'],
})
export class UpdatevoterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  voters: any = [];
  voter: any;
  val: any;
  ngOnInit(): void {
    let sub = this.activatedRoute.params.subscribe((params) => {
      this.val = params['id'];
    });

    console.log('Id' + this.val);
    this.authService
      .getVoterById(this.val)
      .subscribe((data) => (this.voter = data));
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
    this.authService.updateVoter(this.voter).subscribe((data) => {});
    this.getVoter(this.voter.id);
    this.toastr.success('Voter updated successfully');
    this.router.navigate(['/voter/listing']);
  }

  getVoter(id: number) {
    this.authService.getAllVoter().subscribe((res) => {
      this.voter = res;
    });
  }
}
