import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryType} from "../../../../types/category.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly http: HttpClient) {
  }

  getCategories(): Observable<CategoryType[] | DefaultResponseType> {
    return this.http.get<CategoryType[] | DefaultResponseType>(environment.api + 'categories');
  }

  getCategory(id: string): Observable<CategoryType | DefaultResponseType> {
    return this.http.get<CategoryType | DefaultResponseType>(environment.api + 'categories/' + id);
  }

  createCategory(category: CategoryType): Observable<CategoryType | DefaultResponseType> {
    return this.http.post<CategoryType | DefaultResponseType>(environment.api + 'categories', category);
  }

  updateCategory(id: string, category: CategoryType): Observable<CategoryType | DefaultResponseType> {
    return this.http.patch<CategoryType | DefaultResponseType>(environment.api + 'categories/' + id, category);
  }

  deleteCategory(id: string): Observable<CategoryType | DefaultResponseType> {
    return this.http.delete<CategoryType | DefaultResponseType>(environment.api + 'categories/' + id);
  }
}
