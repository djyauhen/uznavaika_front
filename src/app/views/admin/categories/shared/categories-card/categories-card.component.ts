import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryType} from "../../../../../../../types/category.type";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../../../shared/services/categories.service";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {throwError} from "rxjs";

@Component({
  selector: 'categories-card',
  standalone: true,
  imports: [],
  templateUrl: './categories-card.component.html',
  styleUrl: './categories-card.component.scss'
})
export class CategoriesCardComponent {
  @Input() category!: CategoryType;
  @Output() categoryDelete: EventEmitter<boolean> = new EventEmitter<boolean>;


  constructor(private readonly categoriesService: CategoriesService,
              private readonly router: Router) {
  }

  updateCategory(id: string) {
    this.router.navigate([`admin/category/update/${id}`]);
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id)
      .subscribe({
        next: (data: CategoryType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.categoryDelete.emit(true);
            alert('Delete not access');
            return;
          }
          this.categoryDelete.emit(true);
        },
        error: (error) => {
          return throwError(() => {
            console.log(error);
          });
        }
      })
  }
}
