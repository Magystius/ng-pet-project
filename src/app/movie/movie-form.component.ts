import {Component, Input, OnInit} from '@angular/core';
import {Movie} from './movie';
import {Genre} from './genre.enum';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-movie-form',
  template: `
    <div class="movie-form-container mat-elevation-z8">
      <form class="movie-form">
        <mat-form-field class="movie-full-width">
          <input matInput placeholder="ID" disabled value="{{movie.id}}">
        </mat-form-field>
        <mat-form-field class="movie-full-width">
          <input matInput placeholder="Title" name="title" [(ngModel)]="movie.title">
        </mat-form-field>

        <mat-form-field class="movie-full-width">
          <mat-select placeholder="Genre" [(ngModel)]="movie.genre" name="genre">
            <mat-option *ngFor="let genre of genres" [value]="genre">
              {{genre | capitalize}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="movie-full-width">
            <textarea matInput placeholder="Description" name="description"
                      [(ngModel)]="movie.description" matTextareaAutosize matAutosizeMinRows="4" matAutosizeMaxRows="10">
            </textarea>
        </mat-form-field>

        <mat-form-field class="movie-full-width">
          <mat-chip-list #actorList>
            <mat-chip *ngFor="let actor of movie.actors" [selectable]="false"
                      [removable]="true" (remove)="removeActor(actor)">
              {{actor}}
              <mat-icon matChipRemove>cancel</mat-icon>
            </mat-chip>
            <input placeholder="Actors"
                   [matChipInputFor]="actorList"
                   [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                   (matChipInputTokenEnd)="addActor($event)"/>
          </mat-chip-list>
        </mat-form-field>

        <div class="movie-full-width centered">
          <h6>Rating</h6>
          <mat-slider name="rating" [max]="10" [min]="0" step="1" [thumb-label]="true" [(ngModel)]="movie.rating"></mat-slider>
        </div>
      </form>
    </div>
  `,
  styles: [`
    h6 {
      text-align: left;
    }

    .centered {
      text-align: center;
      display: inline-block;
    }

    .movie-form-container {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
    }

    .movie-form {
      text-align: center;
      width: 100%;
      padding: 25px;
    }

    mat-slider {
      width: 100%;
    }

    .movie-full-width {
      width: 50%;
    }

    @media (max-width: 800px) {
      .movie-full-width {
        width: 80%;
      }
    }
  `]
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
