import {Component} from '@angular/core';
import {CategoriesFormComponent} from "../shared/categories-form/categories-form.component";
import {CategoryType} from "../../../../../../types/category.type";
import {Location} from "@angular/common";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CategoriesFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CategoryCreateComponent {
  category: CategoryType | null = null;

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly categoriesService: CategoriesService) {
  }

  changeCategory(categoryItem: CategoryType) {
    this.category = categoryItem;
  }

  createCategory() {
    if (this.category && this.category.title) {
      this.categoriesService.createCategory(this.category)
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
