import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ICharacter, IHabilidades, IInventario } from 'src/app/interfaces/game.interfaces';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BackendService } from 'src/app/services/backend.service';
import { lastValueFrom } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-character-skills-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzSpinModule,
    NzTableModule,
    NzIconModule,
  ],
  templateUrl: './character-skills-modal.component.html',
  styleUrls: ['./character-skills-modal.component.css']
})
export class CharacterSkillsModalComponent {
  isVisible = false;
  character: ICharacter;
  loading = true;
  habilidades: IHabilidades[] = [];
  idForDelete = [];

  constructor(
    private readonly backendService: BackendService,
  ) {}

  async openModal(character: ICharacter): Promise<void> {
    this.character = character;
    this.isVisible = true;
    this.loading = true;
    try {
      const response = await lastValueFrom(this.backendService.gethabilidades(character.id));
      this.habilidades = response;
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
    this.habilidades = [];
    this.idForDelete = [];
  }

  deleteHabilidad(habilidad: IHabilidades, index: number): void {
    this.habilidades.splice(index, 1);
    if (habilidad.id) {
      this.idForDelete.push(habilidad.id);
    }
  }
}
