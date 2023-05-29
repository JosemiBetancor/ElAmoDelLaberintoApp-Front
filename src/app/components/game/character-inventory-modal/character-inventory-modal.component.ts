import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ICharacter, IInventario } from 'src/app/interfaces/game.interfaces';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BackendService } from 'src/app/services/backend.service';
import { Observable, forkJoin, lastValueFrom } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CharacterInventoryAddModalComponent } from '../character-inventory-add-modal/character-inventory-add-modal.component';

@Component({
  selector: 'app-character-inventory-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzSpinModule,
    NzTableModule,
    NzIconModule,
    CharacterInventoryAddModalComponent,
  ],
  templateUrl: './character-inventory-modal.component.html',
  styleUrls: ['./character-inventory-modal.component.css']
})
export class CharacterInventoryModalComponent {

  @ViewChild(CharacterInventoryAddModalComponent) characterInventoryAddModalComponent: CharacterInventoryAddModalComponent;

  isVisible = false;
  character: ICharacter;
  loading = true;
  inventory: IInventario[] = [];
  idForDelete = [];

  constructor(
    private readonly backendService: BackendService,
  ) {}

  async openModal(character: ICharacter): Promise<void> {
    this.character = character;
    this.isVisible = true;
    this.loading = true;
    try {
      const response = await lastValueFrom(this.backendService.getinventory(character.id));
      this.inventory = response;
    } catch(e) {
      console.log(e);
      // Meter aqui un mensaje de error
      this.isVisible = false;
    }
    this.loading = false;
  }

  close(): void {
    this.isVisible = false;
    this.character = null;
    this.inventory = [];
    this.idForDelete = [];
  }

  deleteObject(object: IInventario, index: number): void {
    this.inventory.splice(index, 1);
    if (object.id) {
      this.idForDelete.push(object.id);
    }
  }

  openInventoryAddModal() {
    this.isVisible = false;
    this.characterInventoryAddModalComponent.openModal();
  }

  closeInventoryAddModal(): void {
    this.isVisible = true;
  }

  createInventoryAddModal(event: IInventario) {
    this.isVisible = true;
    this.inventory.push(event);
  }

  async acceptModal(): Promise<void> {
    try {
      const observablesBackend: Observable<any>[] = [];
      for (let item of this.inventory) {
        if (!item.id) {
          observablesBackend.push(this.backendService.postItem(this.character.id, item));
        }
      }
      for (let id of this.idForDelete) {
        observablesBackend.push(this.backendService.deleteItem(id));
      }
      if (observablesBackend.length > 0) {
        await lastValueFrom(forkJoin(observablesBackend));
      }
      this.close();
    } catch (e) {
      //Meter mensaje error
      console.log(e);
    }
  }

}
