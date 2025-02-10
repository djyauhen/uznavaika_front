import {Component, Input} from '@angular/core';
import {LessonType} from "../../../../../../types/lesson.type";
import {NgForOf, NgIf} from "@angular/common";
import {LessonsService} from "../../../../shared/services/lessons.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {LessonAmountPipe} from "../../../../shared/pipes/lesson-amount.pipe";

@Component({
  selector: 'lessons-block',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    LessonAmountPipe
  ],
  templateUrl: './lessons-block.component.html',
  styleUrl: './lessons-block.component.scss'
})
export class LessonsBlockComponent {
  @Input() category_id!: string;

  categoryLessons: LessonType[] | null = null;

  constructor(private readonly lessonsService: LessonsService) {
    this.lessonsService.getLessons()
      .subscribe({
        next: (data: LessonType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            console.log('Error');
          }
          this.categoryLessons = (data as LessonType[]).filter(lesson => lesson.category_id === this.category_id);
        }
      });
  }

  scrollTo() {
    console.log('OK');
    const element = document.getElementById('order-block');
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }
}
