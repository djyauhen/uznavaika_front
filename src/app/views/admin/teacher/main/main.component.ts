import { Component } from '@angular/core';
import {LessonsCardComponent} from "../../lessons/shared/lessons-card/lessons-card.component";
import {NgForOf} from "@angular/common";
import {TeacherCardComponent} from "../shared/teacher-card/teacher-card.component";
import {Router, RouterLink} from "@angular/router";
import {TeacherType} from "../../../../../../types/teacher.type";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    LessonsCardComponent,
    NgForOf,
    TeacherCardComponent,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class TeacherMainComponent {
  teachers: TeacherType[] | null = null;

  constructor(private readonly route: Router,
              private readonly teacherService: TeacherService) {
  }

  ngOnInit() {
    this.teacherService.getTeachers()
      .subscribe({
        next: (data: TeacherType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.route.navigate(['admin']);
          }
          this.teachers = data as TeacherType[];
        },
        error: err => {
          this.route.navigate(['admin']);
        }
      })
  }


  reloadTeachers(deleteCategory: boolean) {
    if (deleteCategory) {
      this.ngOnInit();
    }
  }

}
