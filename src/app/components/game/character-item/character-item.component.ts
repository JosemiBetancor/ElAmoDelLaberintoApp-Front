import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ICharacter } from 'src/app/interfaces/game.interfaces';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { lastValueFrom } from 'rxjs';
import { CharacterInventoryModalComponent } from '../character-inventory-modal/character-inventory-modal.component';

@Component({
  selector: 'app-character-item',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    CharacterInventoryModalComponent,
  ],
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {

  @Input() character!: ICharacter;

  @ViewChild('characterInventoryModal') characterInventoryModal: CharacterInventoryModalComponent;

  inputStringOnEdit = false;
  hover = false;

  constructor(
    private readonly backendService: BackendService
  ) { }

  ngOnInit(): void {

  }

  changeAttributeCharacter2Number(value: any, attribute: string): void {
    this.character[attribute] = Number(value);
  }

  inputStringFocusOutAttributeEvent(event: FocusEvent, attribute: string): void {
    if (this.inputStringOnEdit) return;
    const target = event.target as HTMLInputElement;
    this.cancelEditAttributeInput(target, attribute);
  }

  cancelEditAttributeInput(target: HTMLInputElement, attribute: string) {
    target.value = String(this.character[attribute]);
  }

  async editAttributeCharacter(event: KeyboardEvent, attribute: string, options?: any): Promise<void> {
    const target = event.target as HTMLInputElement;
    try {
      this.inputStringOnEdit = true;
      target.blur();
      let value: any = target.value;
      if (options) {
        if (options.isNumber) {
          value = Number(value);
        }
      }
      const newCharacter = {
        ...this.character,
        [attribute]: value,
      }
      const response = await lastValueFrom(this.backendService.putCharacter(this.character.id, newCharacter));
      this.character[attribute] = value;
    } catch (e) {
      this.cancelEditAttributeInput(target, attribute);
      console.log(e);
    }
    this.inputStringOnEdit = false;
  }
  hola() {
    console.log('hola funciono')
  }

  openInventory() {
    this.characterInventoryModal.openModal(this.character);
  }

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const imageUrl = await lastValueFrom(this.backendService.updateCharacterImage(formData));
    const JsonUrl = JSON.stringify(imageUrl);
    const stringUrl = JSON.parse(JsonUrl).url;
    const newCharacter = {
      ...this.character,
      imagen: stringUrl,
    }
    await lastValueFrom(this.backendService.putCharacter(this.character.id, newCharacter));
    this.character.imagen = stringUrl;
  }
}
