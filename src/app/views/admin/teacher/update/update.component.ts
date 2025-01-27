import { Component } from '@angular/core';
import {TeacherFormComponent} from "../shared/teacher-form/teacher-form.component";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {TeacherType} from "../../../../../../types/teacher.type";
import {DefaultResponseType} from "../../../../../../types/default-response.type";

@Component({
  selector: 'app-update',
  standalone: true,
    imports: [
        TeacherFormComponent
    ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class TeacherUpdateComponent {
  teacher: FormData | null = null;

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly teacherService: TeacherService,
              private readonly activeRoute: ActivatedRoute) {
  }

  changeTeacher(teacherItem: FormData) {
    this.teacher = teacherItem;
  }


  updateTeacher() {

    if (this.teacher) {
      const id = this.activeRoute.snapshot.params['id'];
      this.teacherService.updateTeacher(id, this.teacher)
        .subscribe({
          next: (data: TeacherType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка редактирования педагога');
              return;
            }
            this.route.navigate(['/admin/teacher']);
          }
        })
    } else {

      alert('Заполните педагога');
    }
  }

  goBack() {
    this.location.back();
  }
}
