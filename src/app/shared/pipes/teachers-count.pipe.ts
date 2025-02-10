import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teachersCount',
  standalone: true
})
export class TeachersCountPipe implements PipeTransform {

  transform(value: number): string {
    let valueString = ''
    if ((value + 1) < 10 ) {
      valueString = `0${value}`;
    } else {
      valueString = `${value}`
    }
    return valueString;
  }

}
