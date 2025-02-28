import {Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {LessonType} from "../../../../../../types/lesson.type";
import {NgForOf, NgIf, NgSwitchCase} from "@angular/common";
import {LessonsService} from "../../../../shared/services/lessons.service";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {LessonAmountPipe} from "../../../../shared/pipes/lesson-amount.pipe";
import {environment} from "../../../../../../environment/environment";
import {CarouselComponent, CarouselModule, OwlOptions, SlidesOutputData} from "ngx-owl-carousel-o";
import {NbspAfterPrepositionsPipe} from "../../../../shared/pipes/preposition.pipe";
import {SanitizeHtmlPipe} from "../../../../shared/pipes/sanitize-html.pipe";

@Component({
  selector: 'lessons-block',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    LessonAmountPipe,
    CarouselModule,
    NgSwitchCase,
    NbspAfterPrepositionsPipe,
    SanitizeHtmlPipe
  ],
  templateUrl: './lessons-block.component.html',
  styleUrl: './lessons-block.component.scss',
})
export class LessonsBlockComponent {
  @Input() category_id!: string;
  @Input() visuallyImpaired: boolean = false;
  categoryLessons: LessonType[] | null = null;
  tabletMobScreen: boolean = false;
  mobileVersion: boolean = false;


  isFirstSlide: boolean = true;
  isLastSlide: boolean = false;
  @ViewChild('owlLessons', {static: false}) owlLessons: CarouselComponent | undefined;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false,
    autoHeight: false
  };

  constructor(private readonly lessonsService: LessonsService) {
    if (window.innerWidth < 1000) {
      this.tabletMobScreen = true;
    }

    if (window.innerWidth < 768) {
      this.mobileVersion = true;
    }

    this.lessonsService.getLessons()
      .subscribe({
        next: (data: LessonType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            console.log('Error');
          }
          this.categoryLessons = (data as LessonType[]).filter(lesson => lesson.category_id === this.category_id);
          console.log(this.categoryLessons);
        }
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['visuallyImpaired']) {
      console.log('visuallyImpaired изменился:', changes['visuallyImpaired'].currentValue);
      // Здесь ваша логика при изменении
    }
  }

  scrollTo() {
    console.log('OK');
    const element = document.getElementById('order-block');
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }
  changeSlide(event: SlidesOutputData) {
    if (!this.owlLessons || !this.owlLessons.slidesData) return;

    const totalSlides = this.owlLessons.slidesData.length; // Количество слайдов
    const currentIndex = event.startPosition ?? 0; // Текущий индекс слайда

    this.isFirstSlide = currentIndex === 0;
    this.isLastSlide = currentIndex === totalSlides - 1;
  }

  protected readonly environment = environment;
}
