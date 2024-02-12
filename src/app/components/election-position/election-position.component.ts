import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from 'src/app/services/Position.service';
import { Position } from '../interfaces/position.interface';

@Component({
  selector: 'app-election-position',
  templateUrl: './election-position.component.html',
  styleUrls: ['./election-position.component.css'],
})
export class ElectionPositionComponent implements OnInit {
  positionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.positionForm = this.fb.group({
      name: [null, Validators.required],
      cityName: [null, Validators.required],
      position: [null, Validators.required],
    });
  }

  generateRandomId(): number {
    const random = Math.floor(Math.random() * 10) + 1;
    return random;
  }

  submitPosition() {
    if (this.positionForm) {
      //const positionValue = this.positionForm.get('position')!.value;
      const positionValue = this.positionForm.value.position;
      const positionData: Position = {
        id: this.generateRandomId(),
        name: this.positionForm.get('name')!.value,
        positionLevel: positionValue == '1' ? 'City Level' : 'Country Level',
      };

      if (positionValue == '1') {
        positionData.cityName = this.positionForm.get('cityName')!.value;

        this.positionService.addCityPosition(positionData).subscribe((res) => {
          this.toastr.success('City Position Added Successfully');
        });
      } else if (positionValue == '2') {
        this.positionService
          .addCountryPosition(positionData)
          .subscribe((res) => {
            this.toastr.success('Country Position Added Successfully');
          });
      } else {
        this.toastr.error('Position not added');
      }
    }
  }
}
