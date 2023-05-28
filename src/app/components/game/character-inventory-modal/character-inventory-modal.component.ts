import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ICharacter, IInventario } from 'src/app/interfaces/game.interfaces';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BackendService } from 'src/app/services/backend.service';
import { lastValueFrom } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  ],
  templateUrl: './character-inventory-modal.component.html',
  styleUrls: ['./character-inventory-modal.component.css']
})
export class CharacterInventoryModalComponent {

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

}
