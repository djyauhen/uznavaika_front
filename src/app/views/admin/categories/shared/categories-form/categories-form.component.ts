import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CategoryType} from "../../../../../../../types/category.type";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../../../../shared/services/categories.service";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";

@Component({
  selector: 'categories-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.scss'
})
export class CategoriesFormComponent {
  category: CategoryType | null = null;
  @Output() categoryCreate: EventEmitter<CategoryType> = new EventEmitter<CategoryType>;

  fb = inject(FormBuilder);
  categoryForm = this.fb.group({
    title: ['', Validators.required]
  })

  constructor(private readonly activeRoute: ActivatedRoute,
              private readonly categoriesService: CategoriesService,
              private readonly route: Router) {
  }

  ngOnInit() {
    const activatedRoute = this.activeRoute.snapshot.params['id'];
    if (activatedRoute) {
      this.categoriesService.getCategory(activatedRoute)
        .subscribe({
          next: (data: CategoryType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.route.navigate(['admin/category']);
              return;
            }
            this.category = data as CategoryType;
            if (this.category && this.category.title) {
              this.categoryForm.setValue({
                title: this.category.title
              })
            }
          },
          error: (error) => {
            this.route.navigate(['admin/category']);
          }
        })
    }
  }

  categoryChange() {
    if (this.categoryForm.valid && this.categoryForm.value.title) {
      if (this.category) {
        this.category.title = this.categoryForm.value.title;
      } else {
        this.category = {
          title: this.categoryForm.value.title
        }
      }
      this.categoryCreate.emit(this.category);
    }
  }
}
