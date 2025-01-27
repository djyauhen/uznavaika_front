import {Component} from '@angular/core';
import {DocumentFormComponent} from "../shared/document-form/document-form.component";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {DocumentService} from "../../../../shared/services/document.service";
import {DocumentType} from "../../../../../../types/document.type";
import {DefaultResponseType} from "../../../../../../types/default-response.type";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    DocumentFormComponent
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class DocumentUpdateComponent {
  document: FormData | null = null;

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly documentService: DocumentService,
              private readonly activatedRoute: ActivatedRoute) {
  }


  changeDocument(documentItem: FormData) {
    this.document = documentItem;
  }

  updateDocument() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (this.document) {
      console.log(this.document);
      this.documentService.updateDocument(id, this.document)
        .subscribe({
          next: (data: DocumentType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка редактирования документа');
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
