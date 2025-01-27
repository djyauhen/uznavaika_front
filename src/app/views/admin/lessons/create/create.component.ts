import { Component } from '@angular/core';
import {LessonsFormComponent} from "../shared/lessons-form/lessons-form.component";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {LessonType} from "../../../../../../types/lesson.type";
import {LessonsService} from "../../../../shared/services/lessons.service";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    LessonsFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class LessonCreateComponent {
  lesson: LessonType | null = null;

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly lessonsService: LessonsService) {
  }

  changeLesson(lessonItem: LessonType) {
    this.lesson = lessonItem;
  }

  createLesson() {
    if (this.lesson) {
      this.lessonsService.createLesson(this.lesson)
        .subscribe({
          next: (data: LessonType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка создания занятия');
              return;
            }
            this.route.navigate(['/admin/lesson']);
          }
        })
    } else {
      alert('Заполните занятие');
    }
  }

  goBack() {
    this.location.back();
  }
}
