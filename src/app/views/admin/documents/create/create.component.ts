import { Component } from '@angular/core';
import {LessonsFormComponent} from "../../lessons/shared/lessons-form/lessons-form.component";
import {DocumentFormComponent} from "../shared/document-form/document-form.component";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {DocumentService} from "../../../../shared/services/document.service";
import {DocumentType} from "../../../../../../types/document.type";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    LessonsFormComponent,
    DocumentFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class DocumentCreateComponent {
  document: FormData | null = null;

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly documentService: DocumentService) {
  }


  changeDocument(documentItem: FormData) {
    this.document = documentItem;
  }

  createDocument() {
    if (this.document) {
      console.log(this.document);
      this.documentService.createDocument(this.document)
        .subscribe({
          next: (data: DocumentType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка создания документа');
              return;
            }
            this.route.navigate(['/admin/document']);
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
