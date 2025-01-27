import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {LessonsCardComponent} from "../shared/lessons-card/lessons-card.component";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {LessonsService} from "../../../../shared/services/lessons.service";
import {LessonType} from "../../../../../../types/lesson.type";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    LessonsCardComponent,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class LessonMainComponent {
  lessons: LessonType[] | null = null;

  constructor(private readonly lessonsService: LessonsService,
              private readonly route: Router) {
  }

  ngOnInit() {
    this.lessonsService.getLessons()
      .subscribe({
        next: (data: LessonType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.route.navigate(['/admin']);
          }
          this.lessons = data as LessonType[];
        }
      })
  }

  reloadLessons(deleteCategory: boolean) {
    if (deleteCategory) {
      this.ngOnInit();
    }
  }
}
