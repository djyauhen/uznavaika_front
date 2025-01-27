import { Component } from '@angular/core';
import {Location, NgIf} from "@angular/common";
import {LessonsService} from "../../../../shared/services/lessons.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {LessonType} from "../../../../../../types/lesson.type";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {TeacherType} from "../../../../../../types/teacher.type";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {environment} from "../../../../../../environment/environment";

@Component({
  selector: 'app-view',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class TeacherViewComponent {
  teacher: TeacherType | null = null;

  constructor(private readonly teacherService: TeacherService,
              private readonly route: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly location: Location) {
  }

  ngOnInit() {
    const activatedRoute = this.activeRoute.snapshot.params['id'];
    if (activatedRoute) {
      this.teacherService.getTeacher(activatedRoute)
        .subscribe({
          next: (data: TeacherType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.route.navigate(['admin/teacher']);
              return;
            }
            this.teacher = data as TeacherType;
          },
          error: (error) => {
            this.route.navigate(['admin/teacher']);
          }
        })
    } else {
      this.route.navigate(['admin/teacher']);
    }
  }

  goBack() {
    this.location.back();
  }

  protected readonly environment = environment;
}
