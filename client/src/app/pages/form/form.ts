import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      program: ['', Validators.required],
      enrollment: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { program, enrollment } = this.form.value;

    console.log(this.form.value);

    this.router.navigate(['/result'], {
      queryParams: { program, enrollment },
    });
  }
}
