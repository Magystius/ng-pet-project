import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string | Array<any>, length: number = 10): string | Array<any> {
    return typeof value === 'string' ? value.slice(0, length) + '...' : value.slice(0, length);
  }

}
