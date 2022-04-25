import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {Moment} from 'moment';
import {MatDatepicker} from "@angular/material/datepicker";
import {Router} from "@angular/router";

import {IOwner} from "../../../../interfaces/owner.interface";


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    yearA11yLabel: 'YYYY',
  },
};

export enum OWNER_FORM_TYPES {
  EDIT = 'edit',
  PREVIEW = 'preview'
}

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class OwnerFormComponent implements OnInit, OnChanges {
  @Input() owner: IOwner | null = null;
  @Input() type: OWNER_FORM_TYPES | null = null;

  @Output() saved = new EventEmitter<IOwner>();

  form!: FormGroup;
  private identicalNumberRegExp = /^[ABCEHIKMOPTX]{2}(?!0{4})\d{4}[ABCEHIKMOPTX]{2}$/;

  get cars(): FormArray {
    return this.form.get('cars') as FormArray;
  }

  get isReadonly(): boolean {
    return this.type === OWNER_FORM_TYPES.PREVIEW;
  }

  get startYear(): Date {
    return new Date(new Date().setFullYear(1990));
  }

  get endYear(): Date {
    return new Date(Date.now());
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void {
    this.createForm();
  }

  createForm() {
    if (this.owner) {
      const owner = this.owner;
      this.form = new FormGroup({
        lastName: new FormControl(owner.lastName, [Validators.required]),
        firstName: new FormControl(owner.firstName, [Validators.required]),
        middleName: new FormControl(owner.middleName, [Validators.required]),
        cars: new FormArray(owner.cars.map(car =>  new FormGroup({
          yearOfProduction: new FormControl(new Date(car.yearOfProduction), [Validators.required]),
          authorName: new FormControl(car.authorName, [Validators.required]),
          model: new FormControl(car.model, [Validators.required]),
          identicalNumber: new FormControl(car.identicalNumber, [Validators.required, Validators.pattern(this.identicalNumberRegExp)]),
        })))
      });

      return;
    }

    this.form = new FormGroup({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      cars: new FormArray([
        new FormGroup({
          yearOfProduction: new FormControl('', [Validators.required]),
          authorName: new FormControl('', [Validators.required]),
          model: new FormControl('', [Validators.required]),
          identicalNumber: new FormControl('', [Validators.required, Validators.pattern(this.identicalNumberRegExp)]),
        })
      ])
    });
  }

  createCar() {
    const car = new FormGroup({
      yearOfProduction: new FormControl('', [Validators.required]),
      authorName: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      identicalNumber: new FormControl('', [Validators.required, Validators.pattern(this.identicalNumberRegExp)]),
    });

    this.cars.push(car);
  }

  deleteCar(carIndex: number) {
    this.cars.removeAt(carIndex);
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<any>, controlIdx: number) {
    const control = this.cars.at(controlIdx).get('yearOfProduction');
    if (control) {
      const ctrlValue = new Date().setFullYear(normalizedYear.year());
      control.setValue(new Date(ctrlValue));
    }
    datepicker.close();
  }

  back() {
    this.router.navigate(['/owners']);
  }

  save() {
    if (this.isReadonly || this.form.invalid) {
      return;
    }

    const values = this.owner?.id
      ? { ...this.form.value, id: this.owner.id }
      : this.form.value;

    this.saved.emit(values);
  }
}
