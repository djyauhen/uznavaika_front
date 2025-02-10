import {Component} from '@angular/core';
import {DocumentFormComponent} from "../../documents/shared/document-form/document-form.component";
import {Location, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { Router} from "@angular/router";
import {PhotosService} from "../../../../shared/services/photos.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {PhotoType} from "../../../../../../types/photo.type";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    DocumentFormComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class PhotoCreateComponent {
  photo: FormData = new FormData();
  photoUrl: string | null = null; // Ссылка на фото для предпросмотра
  fileToUpload: File | null = null; // Фото для отправки на сервер
  photoForm!: FormGroup;

  constructor(private readonly photosService: PhotosService,
              private readonly route: Router,
              private readonly fb: FormBuilder,
              private readonly location: Location,) {
  }

  ngOnInit() {
    this.photoForm = this.fb.group({
      additionalData: '',
    });
  }

  photoChange() {
    if (this.fileToUpload) {
      this.photo.append("file", this.fileToUpload);

      if (this.photoForm && this.photoForm.value.additionalData) {
        this.photo.append("additionalData", this.photoForm.get('additionalData')!.value!);
      }
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

  createPhoto() {
    // console.log(this.photo);
    if (this.photo && this.photo.has('file')) {
      this.photosService.createPhoto(this.photo)
        .subscribe({
          next: (data: PhotoType | DefaultResponseType) => {
            console.log(data);
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка загрузки фото');
              return;
            }
            this.route.navigate(['/admin/photo']);
          }
        })
    } else {
      alert('Вставьте фото');
    }
  }

  goBack() {
    this.location.back();
  }

}
