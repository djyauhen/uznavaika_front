import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CategoryType} from "../../../../../../../types/category.type";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {CategoriesService} from "../../../../../shared/services/categories.service";
import {LessonType, TypeCategory} from "../../../../../../../types/lesson.type";
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../../../../../shared/services/lessons.service";
import {NgForOf} from "@angular/common";
import {Editor} from "primeng/editor";

@Component({
  selector: 'lessons-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    Editor,
  ],
  templateUrl: './lessons-form.component.html',
  styleUrl: './lessons-form.component.scss'
})
export class LessonsFormComponent {
  categories: CategoryType[] | null = null;
  lesson: LessonType | null = null;
  @Output() lessonCreate: EventEmitter<LessonType> = new EventEmitter<LessonType>;

  fb = inject(FormBuilder);
  lessonForm = this.fb.group({
    name: ['', Validators.required],
    category_id: ['', Validators.required],
    age: ['', Validators.required],
    description: ['', Validators.required],
    types_class: this.fb.array([]), // FormArray для массива объектов
    subscription_amount: [0],
  });

  editorConfig = {
    enableToolbar: true,
    showToolbar: true,
    editable: true,
    customClasses: [
      {
        name: 'input-item',
        class: 'input-item',
      },
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['undo', 'redo', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
        'indent', 'outdent', 'heading', 'fontName'],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(private readonly categoriesService: CategoriesService,
              private readonly lessonsService: LessonsService,
              private readonly route: Router,
              private readonly activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadCategories();
    const activatedRoute = this.activeRoute.snapshot.params['id'];
    if (activatedRoute) {
      this.lessonsService.getLesson(activatedRoute)
        .subscribe({
          next: (data: LessonType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.route.navigate(['admin/lesson']);
              return;
            }
            this.lesson = data as LessonType;
            if (this.lesson) {
              const {name, category_id, age, description, types_class, subscription_amount} = this.lesson;

              if (name && category_id && age && description) {
                this.lessonForm.patchValue({
                  name,
                  category_id,
                  age,
                  description,
                  subscription_amount: subscription_amount ?? null, // Если значение отсутствует, подставляем null
                });

                // Заполняем FormArray types_class из полученных данных
                if (types_class) {
                  types_class.forEach((type: TypeCategory) => {
                    const typeClassGroup = this.fb.group({
                      class_name: [type.class_name, Validators.required],
                      amount: [type.amount, [Validators.required, Validators.min(0)]],
                    });
                    this.typesClassArray.push(typeClassGroup);
                  });
                }
              }
            }
          },
          error: (error) => {
            this.route.navigate(['admin/lesson']);
          }
        })
    }
  }

  get typesClassArray(): FormArray {
    return this.lessonForm.get('types_class') as FormArray;
  }

  addTypeClass() {
    const typeClassGroup = this.fb.group({
      class_name: ['', Validators.required], // Поле class_name
      amount: [0, [Validators.required, Validators.min(0)]], // Поле amount
    });
    this.typesClassArray.push(typeClassGroup);
  }

  removeTypeClass(index: number) {
    this.typesClassArray.removeAt(index);
  }

  loadCategories() {
    this.categoriesService.getCategories()
      .subscribe({
        next: (data: CategoryType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Не создано ни одной категории');
          }
          this.categories = data as CategoryType[];
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  lessonChange() {
    if (this.lessonForm.valid && this.lessonForm.value.name && this.lessonForm.value.category_id && this.lessonForm.value.age && this.lessonForm.value.description && this.lessonForm.value.types_class) {
      if (this.lesson) {
        this.lesson.name = this.lessonForm.value.name;
        this.lesson.category_id = this.lessonForm.value.category_id;
        this.lesson.age = this.lessonForm.value.age;
        this.lesson.description = this.lessonForm.value.description;
        this.lesson.subscription_amount = this.lessonForm.value.subscription_amount;
        this.lesson.types_class = this.lessonForm.value.types_class as TypeCategory[];
      } else {
        this.lesson = {
          name: this.lessonForm.value.name,
          category_id: this.lessonForm.value.category_id,
          age: this.lessonForm.value.age,
          description: this.lessonForm.value.description,
          subscription_amount: this.lessonForm.value.subscription_amount,
          types_class: this.lessonForm.value.types_class as TypeCategory[],
        }
      }
      this.lessonCreate.emit(this.lesson);
    }
  }

  changeDesc() {
    this.lessonChange();
  }
}
