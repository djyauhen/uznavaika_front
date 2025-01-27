import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {TeacherType} from "../../../../../../types/teacher.type";
import {TeacherService} from "../../../../shared/services/teacher.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {DocumentType} from "../../../../../../types/document.type";
import {DocumentService} from "../../../../shared/services/document.service";
import {DocumentCardComponent} from "../shared/document-card/document-card.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DocumentCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class DocumentMainComponent {
  documents: DocumentType[] | null = null;

  constructor(private readonly route: Router,
              private readonly documentService: DocumentService) {
  }

  ngOnInit() {
    this.documentService.getDocuments()
      .subscribe({
        next: (data: DocumentType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.route.navigate(['admin']);
          }
          this.documents = data as DocumentType[];
        },
        error: err => {
          this.route.navigate(['admin']);
        }
      })
  }


  reloadDocuments(deleteCategory: boolean) {
    if (deleteCategory) {
      this.ngOnInit();
    }
  }
}
