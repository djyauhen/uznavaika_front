import { Component } from '@angular/core';
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {Location} from "@angular/common";
import {TeacherType} from "../../../../../../types/teacher.type";
import {Router} from "@angular/router";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {TeacherFormComponent} from "../shared/teacher-form/teacher-form.component";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    TeacherFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class TeacherCreateComponent {
  teacher: FormData | null = null;

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly teacherService: TeacherService) {
  }


  changeTeacher(teacherItem: FormData) {
    this.teacher = teacherItem;
  }

  createTeacher() {
    if (this.teacher) {
      console.log(this.teacher);
      this.teacherService.createTeacher(this.teacher)
        .subscribe({
          next: (data: TeacherType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка создания педагога');
              return;
            }
            this.route.navigate(['/admin/teacher']);
          }
        })
    } else {
      alert('Заполните все поля и вставьте фото');
    }
  }

  goBack() {
    this.location.back();
  }
}
