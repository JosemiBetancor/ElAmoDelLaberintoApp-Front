import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ICharacter } from 'src/app/interfaces/game.interfaces';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { lastValueFrom, map } from 'rxjs';
import { CharacterInventoryModalComponent } from '../character-inventory-modal/character-inventory-modal.component';
import { CharacterSkillsModalComponent } from '../character-skills-modal/character-skills-modal.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import Swal from 'sweetalert2';

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
    CharacterSkillsModalComponent,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {

  @Input() character!: ICharacter;

  @ViewChild('characterInventoryModal') characterInventoryModal: CharacterInventoryModalComponent;
  @ViewChild('characterSkillsModal') characterSkillsModal: CharacterSkillsModalComponent;
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
  openHabilidades() {
    this.characterSkillsModal.openModal(this.character);
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

  async deleteCharacter(id: number) {
    console.log(id);

    // Mostrar el cuadro de diálogo de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await lastValueFrom(this.backendService.deleteCharacter(id));
        Swal.fire('Eliminado', 'El personaje ha sido eliminado', 'success');
      } catch (error) {
        Swal.fire('Error', 'Se produjo un error al realizar la operación', 'error');
      }



    }
  }

}
