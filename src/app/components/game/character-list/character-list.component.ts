import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICharacter } from 'src/app/interfaces/game.interfaces';
import { CharacterItemComponent } from '../character-item/character-item.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterItemComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  @Input() characters: ICharacter[] = [];

  @Output() charactersChange = new EventEmitter<ICharacter[]>();

  ngOnInit(): void {
      
  }

  changeCharacter(value: ICharacter[]) {
    this.characters = value;
    this.charactersChange.emit(this.characters);
  }

}
