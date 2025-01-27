import { Component } from '@angular/core';
import {DocumentCardComponent} from "../../documents/shared/document-card/document-card.component";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PhotoCardComponent} from "../shared/photo-card/photo-card.component";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {PhotoType} from "../../../../../../types/photo.type";
import {PhotosService} from "../../../../shared/services/photos.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    DocumentCardComponent,
    NgForOf,
    RouterLink,
    PhotoCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class PhotoMainComponent {
  photos: PhotoType[] | null = null;

  constructor(private readonly route: Router,
              private readonly photosService: PhotosService) {
  }

  ngOnInit() {
    this.photosService.getPhotos()
      .subscribe({
        next: (data: PhotoType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.route.navigate(['admin']);
          }
          this.photos = data as PhotoType[];
        },
        error: err => {
          this.route.navigate(['admin']);
        }
      })
  }


  reloadPhotos(deleteCategory: boolean) {
    if (deleteCategory) {
      this.ngOnInit();
    }
  }
}
