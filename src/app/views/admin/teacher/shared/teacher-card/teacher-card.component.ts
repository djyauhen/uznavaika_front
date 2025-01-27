import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeacherType} from "../../../../../../../types/teacher.type";
import {Router} from "@angular/router";
import {TeacherService} from "../../../../../shared/services/teacher.service";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {throwError} from "rxjs";

@Component({
  selector: 'teacher-card',
  standalone: true,
  imports: [],
  templateUrl: './teacher-card.component.html',
  styleUrl: './teacher-card.component.scss'
})
export class TeacherCardComponent {
  @Input() teacher!: TeacherType;
  @Output() teacherDeleted: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(private readonly teacherService: TeacherService,
              private readonly router: Router) {
  }

  updateTeacher(id: string) {
    this.router.navigate([`admin/teacher/update/${id}`]);
  }

  viewTeacher(id: string) {
    this.router.navigate([`admin/teacher/${id}`]);
  }

  deleteTeacher(id: string) {
    this.teacherService.deleteTeacher(id)
      .subscribe({
        next: (data: TeacherType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Удаление не выполнено');
            return;
          }
          this.teacherDeleted.emit(true);
        },
        error: (error) => {
          return throwError(() => {
            console.log(error);
          });
        }
      })
  }
}
