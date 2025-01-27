import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LessonType} from "../../../../types/lesson.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environment/environment";
import {TeacherType} from "../../../../types/teacher.type";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private readonly http: HttpClient) {
  }

  getTeachers(): Observable<TeacherType[] | DefaultResponseType> {
    return this.http.get<TeacherType[] | DefaultResponseType>(environment.api + 'teachers');
  }

  getTeacher(id: string): Observable<TeacherType | DefaultResponseType> {
    return this.http.get<TeacherType | DefaultResponseType>(environment.api + 'teachers/' + id);
  }

  createTeacher(teacher: FormData): Observable<TeacherType | DefaultResponseType> {
    return this.http.post<TeacherType | DefaultResponseType>(environment.api + 'teachers', teacher);
  }

  updateTeacher(id: string, teacher: FormData): Observable<TeacherType | DefaultResponseType> {
    return this.http.patch<TeacherType | DefaultResponseType>(environment.api + 'teachers/' + id, teacher);
  }

  deleteTeacher(id: string): Observable<TeacherType | DefaultResponseType> {
    return this.http.delete<TeacherType | DefaultResponseType>(environment.api + 'teachers/' + id);
  }
}
