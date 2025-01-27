import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lessonAmount',
  standalone: true
})
export class LessonAmountPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value && value !== 0) {
      return `${value} руб`;
    } else if (value === 0) {
      return 'Бесплатно';
    }
    return '';
  }

}
