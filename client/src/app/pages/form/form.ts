import { Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gradecard } from '../../services/gradecard';
import { CommonModule } from '@angular/common';

declare let gtag: Function;
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  form: FormGroup;

  // Signals for reactive state management
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gradeService: Gradecard,
  ) {
    this.form = this.fb.group({
      program: ['', Validators.required],
      enrollment: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });

    // Automatically clear error message when the user starts fixing the input
    this.form.valueChanges.subscribe(() => {
      if (this.errorMessage()) this.errorMessage.set(null);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { program, enrollment } = this.form.value;

    gtag('event', 'grade_check_attempt',{
      program:program,
      enrollment:enrollment
    })

    this.gradeService.fetchGradeCard(program, enrollment).subscribe({
      next: (res) => {
        this.isLoading.set(false);

        // Check if the scraper caught an IGNOU alert (Wrong Enrollment/Program)
        if (res.wrong_input) {

          gtag('event', 'grade_check_invalid',{
            program:program,
            enrollment:enrollment
          });

          this.errorMessage.set(res.wrong_input);
        } else {
          // Success: Navigate to result page and pass data via state to avoid double-fetching

          gtag('event', 'grade_check_success',{
            program:program,
            enrollment:enrollment
          })

          this.router.navigate(['/result'], {
            state: { gradeData: res },
            queryParams: { program, enrollment }, // Keep params for refresh support
          });
        }
      },
      error: (err) => {
        this.isLoading.set(false);

        // Backend/API failure
        gtag('event', 'grade_check_failed',{
          program:program,
          enrollment:enrollment
        })

        this.errorMessage.set(err.error?.message || 'Server connection failed.');
      },
    });
  }
}
