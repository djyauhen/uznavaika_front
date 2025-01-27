import {Component} from '@angular/core';
import {LessonType, TypeCategory} from "../../../../../../types/lesson.type";
import {LessonsService} from "../../../../shared/services/lessons.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {CategoryType} from "../../../../../../types/category.type";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {Location, NgForOf, NgIf} from "@angular/common";
import {LessonAmountPipe} from "../../../../shared/pipes/lesson-amount.pipe";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    LessonAmountPipe
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class LessonViewComponent {
  lesson: LessonType | null = null;
  category: CategoryType | null = null;

  constructor(private readonly lessonsService: LessonsService,
              private readonly route: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly categoriesService: CategoriesService,
              private readonly location: Location) {
  }

  ngOnInit() {
    const activatedRoute = this.activeRoute.snapshot.params['id'];
    if (activatedRoute) {
      this.lessonsService.getLesson(activatedRoute)
        .subscribe({
          next: (data: LessonType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.route.navigate(['admin/lesson']);
              return;
            }
            this.lesson = data as LessonType;
            this.getCategory(this.lesson.category_id);
          },
          error: (error) => {
            this.route.navigate(['admin/lesson']);
          }
        })
    } else {
      this.route.navigate(['admin/lesson']);
    }
  }

  getCategory(category_id: string) {
    this.categoriesService.getCategory(category_id)
      .subscribe({
        next: (data: CategoryType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.route.navigate(['admin/lesson']);
          }
          this.category = data as CategoryType;
        }
      })
  }

  goBack() {
    this.location.back();
  }
}
