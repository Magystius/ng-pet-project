import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {Genre} from '../genre.enum';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  @Input() public movie: Movie;

  public genres = Object.keys(Genre);
  public separatorKeysCodes = [ENTER, COMMA];

  constructor() {
  }

  ngOnInit() {
  }

  public addActor(actorEvent: MatChipInputEvent) {
    if (actorEvent.value) {
      this.movie.actors.push(actorEvent.value.trim());
    }
    actorEvent.input.value = '';
  }

  public removeActor(actor: string) {
    const index = this.movie.actors.indexOf(actor);
    if (index >= 0) {
      this.movie.actors.splice(index, 1);
    }
  }

}
