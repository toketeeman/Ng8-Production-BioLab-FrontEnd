import { AbstractControl } from "@angular/forms";

export function ValidateNumberInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isValid = !isNaN(control.value) && control.value !== null;
  if (isValid) {
    return null;
  }
  return {
    numberInput: true
  };
}
