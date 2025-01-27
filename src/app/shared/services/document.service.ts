import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environment/environment";
import {DocumentType} from "../../../../types/document.type";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private readonly http: HttpClient) {
  }

  getDocuments(): Observable<DocumentType[] | DefaultResponseType> {
    return this.http.get<DocumentType[] | DefaultResponseType>(environment.api + 'documents');
  }

  getDocument(id: string): Observable<DocumentType | DefaultResponseType> {
    return this.http.get<DocumentType | DefaultResponseType>(environment.api + 'documents/' + id);
  }

  createDocument(teacher: FormData): Observable<DocumentType | DefaultResponseType> {
    return this.http.post<DocumentType | DefaultResponseType>(environment.api + 'documents', teacher);
  }

  updateDocument(id: string, teacher: FormData): Observable<DocumentType | DefaultResponseType> {
    return this.http.patch<DocumentType | DefaultResponseType>(environment.api + 'documents/' + id, teacher);
  }

  deleteDocument(id: string): Observable<DocumentType | DefaultResponseType> {
    return this.http.delete<DocumentType | DefaultResponseType>(environment.api + 'documents/' + id);
  }
}
