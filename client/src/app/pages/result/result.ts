import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gradecard } from '../../services/gradecard';
import { NgIf, NgFor, DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe, NgClass],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result implements OnInit {
  loading = signal(false); // Start false because we check state first
  error = signal<string | null>(null);
  data = signal<any>(null);
  total_subject: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gradecardService: Gradecard,
  ) {
    // Check if data was passed via Router State (from Form component)
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state?.['gradeData'];

    if (stateData) {
      this.processResponse(stateData);
    }
  }

  ngOnInit() {
    // If data wasn't in state, we check Query Params (for page refresh)
    if (!this.data()) {
      const program = this.route.snapshot.queryParamMap.get('program');
      const enrollment = this.route.snapshot.queryParamMap.get('enrollment');

      if (!program || !enrollment) {
        this.error.set('Missing program or enrollment number');
        return;
      }
      
      this.setTotalSubjects(program);
      this.fetchData(program, enrollment);
    }
  }

  private setTotalSubjects(program: string) {
    const p = program.toUpperCase();
    if (p === 'BCA') this.total_subject = 39;
    else if (p === 'BCA_NEW') this.total_subject = 32;
    else if (p === 'MCA_NEW' || p === "MCA") this.total_subject = 22;
  }

  private fetchData(program: string, enrollment: string) {
    this.loading.set(true);
    this.error.set(null);

    this.gradecardService.fetchGradeCard(program, enrollment).subscribe({
      next: (response: any) => {
        this.processResponse(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to fetch grade card');
        this.loading.set(false);
      },
    });
  }

  private processResponse(response: any) {
    // Map total subjects if not already set
    if (!this.total_subject && response.student?.program) {
       this.setTotalSubjects(response.student.program);
    }

    this.data.set({
      student: response.student,
      grades: [...response.grades],
      percentage: response.percentage,
      total_subjects: response.total_subject,
    });
  }
}