import {Component, EventEmitter, Output} from '@angular/core';
import {TeacherService} from "../../../../../shared/services/teacher.service";
import {TeacherType} from "../../../../../../../types/teacher.type";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {environment} from "../../../../../../../environment/environment";
import {Editor} from "primeng/editor";

@Component({
  selector: 'teacher-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    Editor
  ],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss'
})
export class TeacherFormComponent {
  teacher: TeacherType | null = null;
  @Output() teacherCreated: EventEmitter<FormData> = new EventEmitter<FormData>;
  photoUrl: string | null = null; // Ссылка на фото для предпросмотра
  fileToUpload: File | null = null; // Фото для отправки на сервер
  studyField: string = '';
  teacherForm!: FormGroup;

  constructor(private readonly teacherService: TeacherService,
              private readonly route: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.teacherForm = this.fb.group({
      full_name: ['', Validators.required],
      post: ['', Validators.required],
      study: ['', Validators.required],
      path: '',
    });

    const activatedRoute = this.activeRoute.snapshot.params['id'];
    if (activatedRoute) {
      this.teacherService.getTeacher(activatedRoute)
        .subscribe({
          next: (data: TeacherType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.route.navigate(['/admin/teacher']);
              return;
            }

            this.teacher = data as TeacherType;
            const {full_name, post, study, path} = this.teacher

            if (full_name && post && study) {
              this.teacherForm.patchValue({
                full_name,
                post,
                study,
                path: path ?? null
              });
              this.studyField = study;
            }

            if (path) this.photoUrl = `${environment.api}${path}`;
          }
        })
    }
  }

  teacherChange() {
    if (this.teacherForm && this.teacherForm.value.full_name && this.teacherForm.value.post && this.teacherForm.value.study && (this.teacherForm.value.path || this.fileToUpload)) {

      const teacherUpdate = new FormData();
      teacherUpdate.append("full_name", this.teacherForm.get('full_name')!.value!);
      teacherUpdate.append("post", this.teacherForm.get('post')!.value!);
      teacherUpdate.append("study", this.teacherForm.get('study')!.value!);

      if (this.teacherForm.value.path) {
        teacherUpdate.append("path", this.teacherForm.get('path')!.value!);
      }

      if (this.fileToUpload) {
        teacherUpdate.append("photo", this.fileToUpload);
      }

      this.teacherCreated.emit(teacherUpdate);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];

      // Генерация URL для предварительного просмотра
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target?.result as string; // Обновляем превью
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  onEditorContentChange() {
    this.teacherChange();
  }
}
