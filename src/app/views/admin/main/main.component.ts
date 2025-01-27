import {Component} from '@angular/core';
import {TeacherType} from "../../../../../types/teacher.type";
import {CategoryType} from "../../../../../types/category.type";
import {LessonType, TypeCategory} from "../../../../../types/lesson.type";
import {OfferType} from "../../../../../types/offer.type";
import {TeacherService} from "../../../shared/services/teacher.service";
import {CategoriesService} from "../../../shared/services/categories.service";
import {LessonsService} from "../../../shared/services/lessons.service";
import {OffersService} from "../../../shared/services/offers.service";
import {DocumentService} from "../../../shared/services/document.service";
import {DefaultResponseType} from "../../../../../types/default-response.type";
import {DocumentType} from "../../../../../types/document.type";
import {NgForOf, NgIf} from "@angular/common";
import {LessonAmountPipe} from "../../../shared/pipes/lesson-amount.pipe";
import {environment} from "../../../../../environment/environment";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    LessonAmountPipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  teachers: TeacherType[] | null = null;
  categories: CategoryType[] | null = null;
  lessons: LessonType[] | null = null;
  offers: OfferType[] | null = null;
  documents: DocumentType[] | null = null;
  lessonsWithCategories: {
    category_id: string;
    subscription_amount?: number | null;
    name: string;
    categoryTitle: string;
    description: string;
    _id?: string;
    age: string;
    types_class: TypeCategory[]
  }[] = [];

  constructor(private readonly teacherService: TeacherService,
              private readonly categoriesService: CategoriesService,
              private readonly lessonsService: LessonsService,
              private readonly offersService: OffersService,
              private readonly documentService: DocumentService,) {
  }

  ngOnInit() {
    this.teacherService.getTeachers()
      .subscribe({
        next: (data: TeacherType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Произошла ошибка. Повторите немного позже!');
          }
          this.teachers = data as TeacherType[];
        },
        error: err => {
          alert('Произошла ошибка. Повторите немного позже!');
        }
      });

    this.categoriesService.getCategories()
      .subscribe({
        next: (data: CategoryType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Произошла ошибка. Повторите немного позже!');
          }
          this.categories = data as CategoryType[];
          this.getLessons();
        },
        error: () => {
          alert('Произошла ошибка. Повторите немного позже!');
        }
      });





    this.offersService.getOffers()
      .subscribe({
        next: (data: OfferType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Произошла ошибка. Повторите немного позже!');
          }
          this.offers = data as OfferType[];
        },
        error: () => {
          alert('Произошла ошибка. Повторите немного позже!');
        }
      });

    this.documentService.getDocuments()
      .subscribe({
        next: (data: DocumentType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Произошла ошибка. Повторите немного позже!');
          }
          this.documents = data as DocumentType[];
        },
        error: err => {
          alert('Произошла ошибка. Повторите немного позже!');
        }
      });

  }

  getLessons() {
    this.lessonsService.getLessons()
      .subscribe({
        next: (data: LessonType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Произошла ошибка. Повторите немного позже!');
          }
          this.lessons = data as LessonType[];

          if (this.categories) {
            this.lessonsWithCategories = this.lessons.map((lesson) => ({
              ...lesson,
              categoryTitle: this.categories ? (this.categories.find((category) => category._id === lesson.category_id)?.title as string) : 'Без категории',
            }));
          }
        },
        error: () => {
          alert('Произошла ошибка. Повторите немного позже!');
        }
      });
  }

  protected readonly Number = Number;
  protected readonly environment = environment;
}
