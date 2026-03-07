import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GradeCardResponse } from '../../models/gradecard.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class Gradecard {
  constructor(private http:HttpClient){}

  fetchGradeCard(program:string, enrollment:string){
   return this.http.post<GradeCardResponse>(`${environment.apiUrl}/api/test-browser`,{program,enrollment})
  }
}
