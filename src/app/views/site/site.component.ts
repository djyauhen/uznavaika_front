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
import {NbspAfterPrepositionsPipe} from "../../shared/pipes/preposition.pipe";
import {SanitizeHtmlPipe} from "../../shared/pipes/sanitize-html.pipe";

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
    NbspAfterPrepositionsPipe,
    SanitizeHtmlPipe,
  ],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent {
  @ViewChild('owlCarPhotos', {static: false}) owlCarPhotos: CarouselComponent | undefined;
  @ViewChild('owlCarDocuments', {static: false}) owlCarDocuments: CarouselComponent | undefined;

  advantages: { title: string, description: string, subscription: string }[] = [
    {
      title: 'высококвалифицированные педагоги',
      description: 'Профессионалы с высоким уровнем квалификации обладают актуальными знаниями в области педагогики, психологии и развития детей. Их опыт помогает выбирать самые эффективные и современные методики обучения, что способствует более глубокому усвоению материала детьми.',
      subscription: 'Профессионалы с высоким уровнем\n' +
        'квалификации обладают актуальными знаниями\n' +
        'в области педагогики, психологии и развития детей,\n' +
        'а их опыт помогает выбирать самые эффективные\n' +
        'и современные методики обучения.'
    },
    {
      title: 'долгосрочные результаты',
      description: 'Благодаря нашему подходу, ваш ребёнок не просто готов к школе, он становится самостоятельным, уверенным и инициативной личностью,\n' +
        'готовым к новым знаниям и вызовам.',
      subscription: 'Благодаря нашему подходу, ваш ребёнок\n' +
        'не просто готов к школе, он становится самостоятельным, уверенным и инициативной личностью, готовым к новым знаниям и вызовам.'
    },
    {
      title: 'критическое и креативное мышление',
      description: 'Научим вашего ребёнка работать в команде, развивать креативность и критическое мышление. Игровые и проектные подходы, помогают размышлять самостоятельно, решать проблемы и находить нестандартные решения.',
      subscription: 'Научим вашего ребёнка работать в команде, развивать креативность и критическое мышление. Педагоги, через игровые и проектные подходы, учат детей размышлять самостоятельно, решать проблемы и находить нестандартные решения.'
    },
    {
      title: 'индивидуальный подход',
      description: 'Прорабатываем персональную концепцию, каждая деталь программы учитывает потребности вашего ребенка: темперамент, интересы и уровень подготовки.',
      subscription: 'Прорабатываем персональную концепцию, каждая деталь программы учитывает потребности вашего ребенка: темперамент, интересы и уровень подготовки.'
    },
    {
      title: 'Безопасное и дружелюбное окружение',
      description: 'Наш центр обеспечивает безопасные условия для обучения, создавая пространство, где абсолютно каждый ребёнок чувствует себя комфортно,\n' +
        'уверенно и безопасно, в соответствии с пожарными и санитарными нормами.',
      subscription: 'Наш центр обеспечивает безопасные условия\n' +
        'для обучения, создавая пространство, где абсолютно каждый ребёнок чувствует себя комфортно, уверенно и безопасно, в соответствии\n' +
        'с пожарными и санитарными нормами.'
    },
    {
      title: 'творческая атмосфера',
      description: 'Используем игровые методики, творчество\n' +
        'и мультимедийные технологии, чтобы развить у вашего ребёнка интерес к учебе и желание познавать новое.',
      subscription: 'Используем игровые методики, творчество\n' +
        'и мультимедийные технологии, чтобы развить\n' +
        'у вашего ребёнка интерес к учебе и желание познавать новое.'
    },
    {
      title: 'лицензированное учреждение',
      description: 'Наличие лицензии позволяет родителям получать налоговый вычет, \n' +
        'оплачивать занятия материнским капиталом. Так же наличие лицензии\n' +
        'говорит о том, что все программы утверждены отделом образования.',
      subscription: 'Наличие лицензии позволяет родителям получать налоговый вычет, оплачивать занятия материнским капиталом. Так же наличие лицензии говорит о том, что все программы утверждены отделом образования.'
    },
    {
      title: 'забота о здоровье и активности',
      description: 'Благодаря физическому развитию и активным\n' +
        'играм помогаем поддерживать здоровье\n' +
        'и хорошее настроение детям.',
      subscription: 'Включаем в программы занятий физическую активность, благодаря физическому развитию\n' +
        'и активным играм помогаем поддерживать\n' +
        'здоровье  и хорошее настроение детям.'
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
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      708: {
        items: 2,
      },
      1240: {
        items: 3,
      }
    }
  };

  isFirstSlide: boolean = true;
  isLastSlide: boolean = false;
  isFirstSlideDoc: boolean = true;
  isLastSlideDoc: boolean = false;
  smallReviewSlides: boolean = false;
  mobileVersion: boolean = false;
  visuallyImpaired: boolean = false;

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
    if (window.innerWidth < 1300) {
      this.smallReviewSlides = true;
    }
    if (window.innerWidth < 768) {
      this.mobileVersion = true;
    }
    this.getCategories();
    this.getOffers();
    this.getDocuments();
    this.getPhotos();
    this.getTeachers();
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
        if (window.innerWidth > 1299) {
          // Логика для слайдов с 4 фото (1-й, 4-й, 7-й и т.д.)
          if ((slideCount - 1) % 3 === 0) {
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
        } else if (window.innerWidth < 1299 && window.innerWidth > 767) {
          if (currentSlide.length < 3) {
            currentSlide.push(photo);
          }
          // Если накапливаем 4 фото, добавляем слайд и увеличиваем счётчик
          if (currentSlide.length === 3) {
            slides.push({photos: currentSlide});
            currentSlide = [];
            slideCount++;
          }
        } else {
          if (currentSlide.length < 1) {
            currentSlide.push(photo);
          }
          // Если накапливаем 4 фото, добавляем слайд и увеличиваем счётчик
          if (currentSlide.length === 1) {
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

  changeSlide(event
                :
                SlidesOutputData
  ) {
    if (!this.owlCarPhotos || !this.owlCarPhotos.slidesData) return;

    const totalSlides = this.owlCarPhotos.slidesData.length; // Количество слайдов
    const currentIndex = event.startPosition ?? 0; // Текущий индекс слайда

    this.isFirstSlide = currentIndex === 0;
    this.isLastSlide = currentIndex === totalSlides - 1;
  }

  changeSlideDoc(event
                   :
                   SlidesOutputData
  ) {
    if (!this.owlCarDocuments || !this.owlCarDocuments.slidesData) return;

    const totalSlides = this.owlCarDocuments.slidesData.length; // Количество слайдов
    const currentIndex = event.startPosition ?? 0; // Текущий индекс слайда


    if (window.innerWidth <= 767) {
      this.isFirstSlideDoc = currentIndex === 0;
      this.isLastSlideDoc = currentIndex === totalSlides - 1;
    } else if (window.innerWidth < 1300 && window.innerWidth > 767) {
      this.isFirstSlideDoc = currentIndex === 0;
      this.isLastSlideDoc = currentIndex + 1 === totalSlides - 1;
    } else {
      this.isFirstSlideDoc = currentIndex === 0;
      this.isLastSlideDoc = currentIndex + 2 === totalSlides - 1;
    }


  }

  replaceLastLetterWithE(month: string) {

    // Список склонений для дательного падежа
    const monthDeclensions = {
      "январь": "январе",
      "февраль": "феврале",
      "март": "марте",
      "апрель": "апреле",
      "май": "мае",
      "июнь": "июне",
      "июль": "июле",
      "август": "августе",
      "сентябрь": "сентябре",
      "октябрь": "октябре",
      "ноябрь": "ноябре",
      "декабрь": "декабре"
    };

    // Возвращаем склонённый месяц или исходное слово, если его нет в словаре
    const key = month as keyof typeof monthDeclensions;
    return monthDeclensions[key] || month;
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

  openPopup(id
              :
              string
  ) {
    const popup = document.getElementById(id) as HTMLDialogElement;
    if (popup) {
      popup.showModal();
    }
  }

  closePopup(id
               :
               string
  ) {
    const popup = document.getElementById(id) as HTMLDialogElement;
    if (popup && popup.open) {
      popup.close();
    }
  }

  openMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('opened');
  }

  closeMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('opened')) mobileMenu.classList.remove('opened');
  }

  visuallyImpairedChange() {
    this.visuallyImpaired = !this.visuallyImpaired;
  }

  protected readonly environment = environment;
  protected readonly Number = Number;
}
