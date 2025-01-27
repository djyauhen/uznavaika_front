import {Component, EventEmitter, Output} from '@angular/core';
import {DocumentType} from "../../../../../../../types/document.type";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DocumentService} from "../../../../../shared/services/document.service";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {environment} from "../../../../../../../environment/environment";
import {Editor} from "primeng/editor";
import {NgIf} from "@angular/common";

@Component({
  selector: 'document-form',
  standalone: true,
  imports: [
    Editor,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './document-form.component.html',
  styleUrl: './document-form.component.scss'
})
export class DocumentFormComponent {
  documentItem: DocumentType | null = null;
  @Output() documentCreate: EventEmitter<FormData> = new EventEmitter<FormData>;
  coverUrl: string | null = null; // Ссылка на фото для предпросмотра
  documentUrl: boolean = false; // Ссылка на фото для предпросмотра
  documentCover: File | null = null; //Фото для отображения документа
  documentFile: File | null = null; //Сам документ
  documentForm!: FormGroup;

  constructor(private readonly documentService: DocumentService,
              private readonly route: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly fb: FormBuilder,) {
  }

  ngOnInit() {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      documentHash: '',
      documentCover: '',
    })

    const activatedRoute = this.activeRoute.snapshot.params['id'];
    if (activatedRoute) {
      this.documentService.getDocument(activatedRoute)
        .subscribe({
          next: (data: DocumentType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.route.navigate(['/admin/document']);
              return;
            }
            this.documentItem = data as DocumentType;
            const {title, documentCover, documentHash} = this.documentItem;
            if (title && documentCover && documentHash) {
              this.documentForm.patchValue({
                title,
                documentHash,
                documentCover
              });

              this.coverUrl = `${environment.api}${documentCover}`;
              this.documentUrl = true;
            }
          }
        })
    }
  }

  documentChange() {
    if (this.documentForm && this.documentForm.value.title && (this.documentForm.value.documentHash || this.documentFile) && (this.documentForm.value.documentCover || this.documentCover)) {

      const documentUpdate = new FormData();
      documentUpdate.append("title", this.documentForm.get('title')!.value!);

      if (this.documentForm.value.documentHash) {
        documentUpdate.append("documentHash", this.documentForm.get('documentHash')!.value!);
      }
      if (this.documentForm.value.documentCover) {
        documentUpdate.append("documentCover", this.documentForm.get('documentCover')!.value!);
      }

      if (this.documentFile) {
        documentUpdate.append("file", this.documentFile);
      }

      if (this.documentCover) {
        documentUpdate.append("cover", this.documentCover);
      }

      this.documentCreate.emit(documentUpdate);
    }
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.documentCover = input.files[0];

      // Генерация URL для предварительного просмотра
      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverUrl = e.target?.result as string; // Обновляем превью
      };
      reader.readAsDataURL(this.documentCover);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.documentFile = input.files[0];
      if (this.documentFile) this.documentUrl = true;
    }
  }

  protected readonly environment = environment;
}
