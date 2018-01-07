import {Genre} from './genre.enum';

export class Movie {
  constructor(public id: number,
              public title: string,
              public genre?: Genre,
              public description?: string,
              public actors?: Array<string>,
              public rating?: number) {
  }
}
