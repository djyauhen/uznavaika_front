import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {throwError} from "rxjs";
import {PhotosService} from "../../../../../shared/services/photos.service";
import {PhotoType} from "../../../../../../../types/photo.type";
import {environment} from "../../../../../../../environment/environment";
import {NgIf} from "@angular/common";

@Component({
  selector: 'photo-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss'
})
export class PhotoCardComponent {
  @Input() photo!: PhotoType;
  @Output() photoDeleted: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(private readonly photosService: PhotosService) {
  }

  deletePhoto(id: string) {
    this.photosService.deletePhoto(id)
      .subscribe({
        next: (data: PhotoType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Удаление не выполнено');
            return;
          }
          this.photoDeleted.emit(true);
        },
        error: (error) => {
          return throwError(() => {
            console.log(error);
          });
        }
      })
  }

  protected readonly environment = environment;
}
