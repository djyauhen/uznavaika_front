import {Component, Input} from '@angular/core';
import {LessonsFormComponent} from "../shared/lessons-form/lessons-form.component";
import {LessonType} from "../../../../../../types/lesson.type";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {LessonsService} from "../../../../shared/services/lessons.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    LessonsFormComponent
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class LessonUpdateComponent {
  @Input() lesson!: LessonType;

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly lessonsService: LessonsService) {
  }

  changeLesson(lessonItem: LessonType) {
    this.lesson = lessonItem;
    console.log(this.lesson);
  }

  updateLesson() {
    if (this.lesson) {
      console.log(this.lesson);
      this.lessonsService.updateLesson(this.lesson._id!, this.lesson)
        .subscribe({
          next: (data: LessonType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка редактирования категории');
              return;
            }
            this.route.navigate(['/admin/lesson']);
          }
        })
    } else {
      alert('Заполните категорию');
    }
  }

  goBack() {
    this.location.back();
  }
}
