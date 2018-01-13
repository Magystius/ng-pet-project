import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: Array<string>, separator: string = ', '): string {
    return value
      .reduce((previous, current) => previous + current + separator , '')
      .slice(0, -separator.length);
  }

}
