import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICharacter } from 'src/app/interfaces/game.interfaces';
import { CharacterItemComponent } from '../character-item/character-item.component';
import { BackendService } from 'src/app/services/backend.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { CharacterAddCharacterModalComponent } from '../character-add-character-modal/character-add-character-modal.component';
import { lastValueFrom } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterItemComponent,
    FormsModule,
    ReactiveFormsModule,
    CharacterAddCharacterModalComponent,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  @ViewChild(CharacterAddCharacterModalComponent) CharacterAddCharacterModalComponent: CharacterAddCharacterModalComponent;

  @Input() characters: ICharacter[] = [];
  @Output() charactersChange = new EventEmitter<ICharacter[]>();
  isVisible = false;
  character: ICharacter;
  loading = true;
  constructor(private backendService: BackendService) { }
  ngOnInit(): void {
      
  }
hola() {
  console.log('Hola');
}
  changeCharacter(value: ICharacter[]) {
    this.characters = value;
    this.charactersChange.emit(this.characters);
  }

  openCharacterAddModal() {
    this.isVisible = false;
    this.CharacterAddCharacterModalComponent.openModal();
  }
  async createInventoryAddModal(event: ICharacter) {
    this.isVisible = true;
    const value=await lastValueFrom(this.backendService.postCharacters(event));
    this.characters.push(value);
    this.charactersChange.emit(this.characters);
  }
  closeCharacterAddModal(): void {
    this.isVisible = true;
  }

  characterDeleteSuccessEvent(character: ICharacter) {
    let indexDelete = -1;
    this.characters.find((item: ICharacter, index: number) => {
      if (item.id === character.id) {
        indexDelete = index;
        return true;
      }
    });
    if (indexDelete > -1) {
      this.characters.splice(indexDelete, 1);
    }
  }
}
