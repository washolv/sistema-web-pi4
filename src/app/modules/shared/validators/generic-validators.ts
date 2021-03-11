import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


export class GenericValidators {
  constructor() {
  }

  static verifierValidatorsForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campoControls => {
      const control = formGroup.get(campoControls);
      control!.markAsDirty();
      control!.markAsTouched();

      if (control instanceof FormGroup) {
        this.verifierValidatorsForm(control);
      }
    });
  }
}
