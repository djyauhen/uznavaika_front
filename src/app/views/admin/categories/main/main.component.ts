import {Component} from '@angular/core';
import {CategoriesCardComponent} from "../shared/categories-card/categories-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {CategoryType} from "../../../../../../types/category.type";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CategoriesCardComponent,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class CategoryMainComponent {
  categories: CategoryType[] | null = null;

  constructor(private readonly categoriesService: CategoriesService,
              private readonly route: Router) {
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe({
        next: (data: CategoryType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.route.navigate(['/admin']);
          }

          this.categories = data as CategoryType[];
        }
      })
  }

  reloadCategories(deleteCategory: boolean) {
    if (deleteCategory) {
      this.ngOnInit();
    }
  }
}
