import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {throwError} from "rxjs";
import {DocumentType} from "../../../../../../../types/document.type";
import {DocumentService} from "../../../../../shared/services/document.service";
import {environment} from "../../../../../../../environment/environment";

@Component({
  selector: 'document-card',
  standalone: true,
  imports: [],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss'
})
export class DocumentCardComponent {
  @Input() document!: DocumentType;
  @Output() documentDeleted: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(private readonly documentService: DocumentService,
              private readonly router: Router) {
  }

  updateDocument(id: string) {
    this.router.navigate([`admin/document/update/${id}`]);
  }

  deleteDocument(id: string) {
    this.documentService.deleteDocument(id)
      .subscribe({
        next: (data: DocumentType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Удаление не выполнено');
            return;
          }
          this.documentDeleted.emit(true);
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
