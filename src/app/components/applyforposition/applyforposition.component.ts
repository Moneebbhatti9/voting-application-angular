import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applyforposition',
  templateUrl: './applyforposition.component.html',
  styleUrls: ['./applyforposition.component.css'],
})
export class ApplyforpositionComponent implements OnInit {
  showForm = false;
  formType!: string;

  ngOnInit() {}

  toggleForm(type: string) {
    this.showForm = true;
    this.formType = type;
  }

  handleFormSubmit(formData: any) {
    console.log(`${this.formType} Form Data:`, formData);
  }
}
