import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchFields(
  sourceField: string,
  targetField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const source = control.get(sourceField);
    const target = control.get(targetField);

    if (!source || !target) return null;

    return source.value === target.value
      ? null
      : { fieldsMismatch: true };
  };
}

/**
@if (
  form.hasError('fieldsMismatch') &&
  form.get('confirm')?.touched
) {
  <small class="text-red-500">
    Passwords do not match.
  </small>
}
 */