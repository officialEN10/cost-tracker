import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

// Custom Validator to check if password and repeat password fields match
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeat_password');

  return password && repeatPassword && password.value === repeatPassword.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  formErrors: Record<string, unknown> = {};
  error: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeat_password: ['', Validators.required],
      },
      { validator: passwordMatchValidator }
    );

    this.registerForm.valueChanges.subscribe(() => {
      this.formErrors = this.getFormValidationErrors();
    });
  }

  getFormValidationErrors(): any {
    let errors: Record<string, unknown> = {};
    for (const control in this.registerForm.controls) {
      if (this.registerForm.controls[control].errors) {
        errors[control] = this.registerForm.controls[control].errors;
      }
    }
    return errors;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, name, surname, passpord } = this.registerForm.value;
      const user = this.registerForm.value;
      this.userService.register(user).subscribe((newUser) => {
        console.log(user);
        //if registration is successful, we go to main page
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.error = 'Registration invalid: '+error.error.message +"\n.Please try again";
        console.error(error);
      });
    }
  }
}
