import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environment/environment";
import {LessonType} from "../../../../types/lesson.type";

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private readonly http: HttpClient) {
  }

  getLessons(): Observable<LessonType[] | DefaultResponseType> {
    return this.http.get<LessonType[] | DefaultResponseType>(environment.api + 'subcategories');
  }

  getLesson(id: string): Observable<LessonType | DefaultResponseType> {
    return this.http.get<LessonType | DefaultResponseType>(environment.api + 'subcategories/' + id);
  }

  createLesson(category: LessonType): Observable<LessonType | DefaultResponseType> {
    return this.http.post<LessonType | DefaultResponseType>(environment.api + 'subcategories', category);
  }

  updateLesson(id: string, category: LessonType): Observable<LessonType | DefaultResponseType> {
    return this.http.patch<LessonType | DefaultResponseType>(environment.api + 'subcategories/' + id, category);
  }

  deleteLesson(id: string): Observable<LessonType | DefaultResponseType> {
    return this.http.delete<LessonType | DefaultResponseType>(environment.api + 'subcategories/' + id);
  }
}
