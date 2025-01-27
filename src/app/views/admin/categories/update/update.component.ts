import {Component, Input, Output} from '@angular/core';
import {CategoriesFormComponent} from "../shared/categories-form/categories-form.component";
import {CategoryType} from "../../../../../../types/category.type";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CategoriesFormComponent
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class CategoryUpdateComponent {
  @Input() category!: CategoryType

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly categoriesService: CategoriesService) {
  }

  changeCategory(categoryItem: CategoryType) {
    this.category = categoryItem;
  }

  updateCategory() {
    if (this.category && this.category.title) {
      this.categoriesService.updateCategory(this.category._id!, this.category)
        .subscribe({
          next: (data: CategoryType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка создания категории');
              return;
            }
            this.route.navigate(['/admin/category']);
          }
        })
    } else {
      alert('Введите название категории');
    }
  }

  goBack() {
    this.location.back();
  }
}
