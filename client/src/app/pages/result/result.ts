import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gradecard } from '../../services/gradecard';
import { NgIf, NgFor, DecimalPipe, NgClass } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe, NgClass],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  loading = signal(true);
  error = signal<string | null>(null);
  data = signal<any>(null);

  constructor(
    private route: ActivatedRoute,
    private gradecardService: Gradecard,
  ) {}

  ngOnInit() {
    const program = this.route.snapshot.queryParamMap.get('program');
    const enrollment = this.route.snapshot.queryParamMap.get('enrollment');

    if (!program || !enrollment) {
      this.error.set('Invalid parameters');
      this.loading.set(false);
      return;
    }

    console.log('API TRIGGERED');

    this.fetchData(program, enrollment);
  }

  private fetchData(program: string, enrollment: string) {
    this.loading.set(true);
    this.error.set(null);
    this.data.set(null);

    this.gradecardService.fetchGradeCard(program, enrollment).subscribe({
      next: (response: any) => {
        console.log('API RESPONSE:', response);
        this.data.set({
          student: response.student,
          grades: [...response.grades],
          percentage: response.percentage,
          total_subjects: response.total_subject,
        });

        this.loading.set(false);
      },
      error: (err) => {
        console.log('API ERROR:', err);
        this.error.set('Failed to fetch grade card');
        this.loading.set(false);
      },
    });
  }
}
