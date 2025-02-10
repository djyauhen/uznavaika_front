import {Component, inject, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {CategoriesService} from "../../shared/services/categories.service";
import {DocumentService} from "../../shared/services/document.service";
import {PhotosService} from "../../shared/services/photos.service";
import {OffersService} from "../../shared/services/offers.service";
import {TeacherService} from "../../shared/services/teacher.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CategoryType} from "../../../../types/category.type";
import {OfferType} from "../../../../types/offer.type";
import {TeacherType} from "../../../../types/teacher.type";
import {PhotoType} from "../../../../types/photo.type";
import {DocumentType} from "../../../../types/document.type";
import {RouterLink} from "@angular/router";
import {LessonsBlockComponent} from "./shared/lessons-block/lessons-block.component";
import {environment} from "../../../../environment/environment";
import {TeachersCountPipe} from "../../shared/pipes/teachers-count.pipe";
import {CarouselModule, OwlOptions, SlidesOutputData} from "ngx-owl-carousel-o";
import {CarouselComponent} from 'ngx-owl-carousel-o';
import {LessonAmountPipe} from "../../shared/pipes/lesson-amount.pipe";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgxMaskDirective} from "ngx-mask";
import {MailService} from "../../shared/services/mail.service";

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    LessonsBlockComponent,
    TeachersCountPipe,
    NgSwitch,
    NgSwitchCase,
    CarouselModule,
    LessonAmountPipe,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgClass,
  ],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent {
  @ViewChild('owlCarPhotos', {static: false}) owlCarPhotos: CarouselComponent | undefined;
  @ViewChild('owlCarDocuments', {static: false}) owlCarDocuments: CarouselComponent | undefined;

  advantages: { title: string, description: string }[] = [
    {
      title: 'высококвалифицированные педагоги',
      description: 'Профессионалы с высоким уровнем квалификации обладают\n' +
        'актуальными знаниями в области педагогики, психологии и развития детей.\n' +
        'Их опыт помогает выбирать самые эффективные и современные методики\n' +
        'обучения, что способствует более глубокому усвоению материала детьми.'
    },
    {
      title: 'долгосрочные результаты',
      description: 'Благодаря нашему подходу, ваш ребёнок не просто готов к школе, он становится самостоятельным, уверенным и инициативной личностью,\n' +
        'готовым к новым знаниям и вызовам.'
    },
    {
      title: 'критическое и креативное мышление',
      description: 'Научим вашего ребёнка работать в команде, развивать креативность и критическое мышление. Игровые и проектные подходы, помогают размышлять самостоятельно, решать проблемы и находить нестандартные решения.'
    },
    {
      title: 'индивидуальный подход',
      description: 'Прорабатываем персональную концепцию, каждая деталь программы учитывает потребности вашего ребенка: темперамент, интересы и уровень подготовки.'
    },
    {
      title: 'Безопасное и дружелюбное окружение',
      description: 'Наш центр обеспечивает безопасные условия для обучения, создавая пространство, где абсолютно каждый ребёнок чувствует себя комфортно,\n' +
        'уверенно и безопасно, в соответствии с пожарными и санитарными нормами.'
    },
    {
      title: 'творческая атмосфера',
      description: 'Используем игровые методики, творчество\n' +
        'и мультимедийные технологии, чтобы развить у вашего ребёнка интерес к учебе и желание познавать новое.'
    },
    {
      title: 'лицензированное учреждение',
      description: 'Наличие лицензии позволяет родителям получать налоговый вычет, \n' +
        'оплачивать занятия материнским капиталом. Так же наличие лицензии\n' +
        'говорит о том, что все программы утверждены отделом образования.'
    },
    {
      title: 'забота о здоровье и активности',
      description: 'Благодаря физическому развитию и активным\n' +
        'играм помогаем поддерживать здоровье\n' +
        'и хорошее настроение детям.'
    },
  ];

  categories: CategoryType[] | null = null;
  offers: OfferType[] | null = null;
  documents: DocumentType[] | null = null;
  teachers: TeacherType[] | null = null;
  photos: PhotoType[] | null = null;
  selectedTeacher: TeacherType | null = null;
  selectedTeacherNumber: number = 0;
  slidesPhotos: any[] = [];

  thisMonth: string = this.replaceLastLetterWithE(new Date(Date.now()).toLocaleString('ru-RU', {
    month: "long"
  }));

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false
  };

  customOptionsReviews: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 700,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false
  };

  customOptionsDocuments: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 3,
    nav: false,
  };

  isFirstSlide: boolean = true;
  isLastSlide: boolean = false;
  isFirstSlideDoc: boolean = true;
  isLastSlideDoc: boolean = false;

  fb = inject(FormBuilder);
  orderForm: FormGroup = this.fb.group({
    category: ['', [Validators.required, Validators.pattern(/^[А-Яа-я0-9\s-]+(\/[А-Яа-я\s-]+)*$/)]],
    name: ['', [Validators.required, Validators.pattern(/^[А-Яа-я\s-]+(\/[А-Яа-я\s-]+)*$/)]],
    childAge: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    phone: ['', Validators.required],
    agree: [false, Validators.requiredTrue]
  });

  constructor(private readonly categoriesService: CategoriesService,
              private readonly documentsService: DocumentService,
              private readonly photoService: PhotosService,
              private readonly offersService: OffersService,
              private readonly teachersService: TeacherService,
              private readonly mailService: MailService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getOffers();
    this.getDocuments();
    this.getPhotos();
    this.getTeachers();
    console.log(this.thisMonth);
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe({
        next: (data: CategoryType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            console.log('Error');
          }
          this.categories = data as CategoryType[];
        }
      })
  }

  getOffers() {
    this.offersService.getOffers()
      .subscribe({
        next: (data: OfferType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            console.log('Error');
          }
          this.offers = data as OfferType[];
        }
      })
  }

  getDocuments() {
    this.documentsService.getDocuments()
      .subscribe({
        next: (data: DocumentType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {

          }
          this.documents = data as DocumentType[];
          console.log(this.documents);
        }
      })
  }

  getPhotos() {
    this.photoService.getPhotos()
      .subscribe({
        next: (data: PhotoType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {

          }
          this.photos = data as PhotoType[];
          this.slidesPhotos = this.createSlidesWithPhotos(this.photos);
        }
      })
  }

  getTeachers() {
    this.teachersService.getTeachers()
      .subscribe({
        next: (data: TeacherType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {

          }
          this.teachers = data as TeacherType[];
          this.selectedTeacher = this.teachers[0];
        }
      })
  }

  scrollTo(idFunc?: string) {
    const id = idFunc ?? 'order-block'
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  clickTeacherBtn(teacher: TeacherType, id: number) {
    this.selectedTeacher = teacher;
    this.selectedTeacherNumber = id;
  }

  isSelected(teacher: TeacherType): boolean {
    return this.selectedTeacher === teacher;
  }

  createSlidesWithPhotos(photos: PhotoType[]): any[] {
    if (photos && photos.length > 0) {
      let slides = [];
      let currentSlide = [];
      let slideCount = 1; // Счётчик слайдов

      for (let photo of photos) {
        // Логика для слайдов с 4 фото (1-й, 4-й, 7-й и т.д.)
        if (slideCount === 1 || ((slideCount - 1) % 3) === 0) {
          if (currentSlide.length < 4) {
            currentSlide.push(photo);
          }
          // Если накапливаем 4 фото, добавляем слайд и увеличиваем счётчик
          if (currentSlide.length === 4) {
            slides.push({photos: currentSlide});
            currentSlide = [];
            slideCount++;
          }
        } else {
          // Логика для слайдов с 2 фото (все остальные слайды)
          if (currentSlide.length < 2) {
            currentSlide.push(photo);
          }
          // Если накапливаем 2 фото, добавляем слайд и увеличиваем счётчик
          if (currentSlide.length === 2) {
            slides.push({photos: currentSlide});
            currentSlide = [];
            slideCount++;
          }
        }
      }

      // Если после итераций остались фото, добавляем их на последний слайд
      if (currentSlide.length > 0) {
        slides.push({photos: currentSlide});
      }

      return slides;
    }
    return [];
  }

  changeSlide(event: SlidesOutputData) {
    if (!this.owlCarPhotos || !this.owlCarPhotos.slidesData) return;

    const totalSlides = this.owlCarPhotos.slidesData.length; // Количество слайдов
    const currentIndex = event.startPosition ?? 0; // Текущий индекс слайда

    this.isFirstSlide = currentIndex === 0;
    this.isLastSlide = currentIndex === totalSlides - 1;
  }

  changeSlideDoc(event: SlidesOutputData) {
    if (!this.owlCarDocuments || !this.owlCarDocuments.slidesData) return;

    const totalSlides = this.owlCarDocuments.slidesData.length; // Количество слайдов
    const currentIndex = event.startPosition ?? 0; // Текущий индекс слайда

    this.isFirstSlideDoc = currentIndex === 0;
    this.isLastSlideDoc = currentIndex + 2 === totalSlides - 1;
  }

  replaceLastLetterWithE(word: string) {
    if (word.length === 0) return word; // Проверяем, что строка не пустая
    return word.slice(0, -1) + "е";
  }

  sendMessage() {
    if (this.orderForm.valid) {

      this.openPopup('thanks-popup');
      this.orderForm.reset();
      // this.mailService.sendMessage(this.orderForm.value)
      //   .subscribe({
      //     next: (data) => {
      //       if (data.error) {
      //         console.log(data.errorType);
      //       } else {
      //         console.log(data);
      //         this.openPopup('thanks-popup');
      //         this.orderForm.reset();
      //       }
      //     },
      //     error: (err) => {
      //       throw new Error(err);
      //     }
      //   })
    }
  }

  openPopup(id: string) {
    const popup = document.getElementById(id) as HTMLDialogElement;
    if (popup) {
      popup.showModal();
    }
  }

  closePopup(id: string) {
    const popup = document.getElementById(id) as HTMLDialogElement;
    if (popup && popup.open) {
      popup.close();
    }
  }

  protected readonly environment = environment;
  protected readonly Number = Number;
}
