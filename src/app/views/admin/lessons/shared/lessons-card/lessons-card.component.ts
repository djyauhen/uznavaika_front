import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {throwError} from "rxjs";
import {LessonType} from "../../../../../../../types/lesson.type";
import {LessonsService} from "../../../../../shared/services/lessons.service";
import {CategoriesService} from "../../../../../shared/services/categories.service";
import {CategoryType} from "../../../../../../../types/category.type";

@Component({
  selector: 'lessons-card',
  standalone: true,
  imports: [],
  templateUrl: './lessons-card.component.html',
  styleUrl: './lessons-card.component.scss'
})
export class LessonsCardComponent {
  @Input() lesson!: LessonType;
  category: CategoryType | null = null;
  @Output() lessonDelete: EventEmitter<boolean> = new EventEmitter<boolean>;


  constructor(private readonly lessonsService: LessonsService,
              private readonly categoriesService: CategoriesService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.categoriesService.getCategory(this.lesson.category_id)
      .subscribe({
        next: (data: CategoryType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.router.navigate(['admin']);
          }
          this.category = data as CategoryType;
        },
        error: err => {
          this.router.navigate(['admin']);
        }
      })
  }

  updateLesson(id: string) {
    this.router.navigate([`admin/lesson/update/${id}`]);
  }
  viewLesson(id: string) {
    this.router.navigate([`admin/lesson/${id}`]);
  }

  deleteLesson(id: string) {
    this.lessonsService.deleteLesson(id)
      .subscribe({
        next: (data: LessonType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Удаление не выполнено');
            return;
          }
          this.lessonDelete.emit(true);
        },
        error: (error) => {
          return throwError(() => {
            console.log(error);
          });
        }
      })
  }
}
