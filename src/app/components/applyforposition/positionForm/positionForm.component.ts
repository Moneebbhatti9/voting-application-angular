import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from 'src/app/services/Position.service';

@Component({
  selector: 'app-positionForm',
  templateUrl: './positionForm.component.html',
  styleUrls: ['./positionForm.component.css'],
})
export class PositionFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<any>();
  @Input() formType!: string;
  positionForm: FormGroup;

  cityData: any[] = [];
  countryData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ps: PositionService,
    private toastr: ToastrService
  ) {
    this.positionForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, this.ageValidator.bind(this)]],
      party: ['', Validators.required],
      cityName: ['', Validators.required],
      cityPosition: ['', Validators.required],
      countryPosition: ['', Validators.required],
      gender: [''],
    });
  }

  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const age = control.value;
    const minAge = this.formType === 'city' ? 25 : 30;

    if (age < minAge) {
      return { invalidAge: true };
    }

    return null;
  }

  ngOnInit() {
    this.ps.getAllCityPositions().subscribe((data) => {
      this.cityData = data;
    });

    this.ps.getAllCountryPositions().subscribe((data) => {
      this.countryData = data;
    });
  }

  onSubmit() {
    const formValue = this.positionForm.value;

    if (this.formType === 'city') {
      this.ps.applyForCityPosition(formValue).subscribe((data) => {
        this.toastr.success(
          `Congrats successfully applied for ${formValue.cityPosition} in ${formValue.cityName} `
        );
        this.positionForm.reset();
      });
    } else {
      this.ps.applyForCountryPosition(formValue).subscribe((data) => {
        this.toastr.success(
          `Congrats successfully applied for ${formValue.countryPosition}`
        );
        this.positionForm.reset();
      });
    }
  }
}
