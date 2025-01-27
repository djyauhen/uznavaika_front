import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environment/environment";
import {PhotoType} from "../../../../types/photo.type";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private readonly http: HttpClient) {
  }

  getPhotos(): Observable<PhotoType[] | DefaultResponseType> {
    return this.http.get<PhotoType[] | DefaultResponseType>(environment.api + 'photos');
  }

  getPhoto(id: string): Observable<PhotoType | DefaultResponseType> {
    return this.http.get<PhotoType | DefaultResponseType>(environment.api + 'photos/' + id);
  }

  createPhoto(photo: FormData): Observable<PhotoType | DefaultResponseType> {
    return this.http.post<PhotoType | DefaultResponseType>(environment.api + 'photos', photo);
  }

  deletePhoto(id: string): Observable<PhotoType | DefaultResponseType> {
    return this.http.delete<PhotoType | DefaultResponseType>(environment.api + 'photos/' + id);
  }
}
