import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ICharacter, IHabilidades, IInventario } from 'src/app/interfaces/game.interfaces';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BackendService } from 'src/app/services/backend.service';
import { Observable, forkJoin, lastValueFrom } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import{CharacterSkillsAddModalComponent} from '../character-skills-add-modal/character-skills-add-modal.component';
import Swal from 'sweetalert2';


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
    CharacterSkillsAddModalComponent,
  ],
  templateUrl: './character-skills-modal.component.html',
  styleUrls: ['./character-skills-modal.component.css']
})
export class CharacterSkillsModalComponent {

  @ViewChild(CharacterSkillsAddModalComponent) characterSkillsAddModalComponent: CharacterSkillsAddModalComponent;


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
  openSkillsAddModal() {
    this.isVisible = false;
    this.characterSkillsAddModalComponent.openModal();
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
  createSkillsAddModal(event: IInventario) {
    this.isVisible = true;
    this.habilidades.push(event);
  }

  async acceptModal(): Promise<void> {
    try {
      const observablesBackend: Observable<any>[] = [];
      const skillsToDelete: number[] = [];
  
      for (let skill of this.habilidades) {
        if (!skill.id) {
          observablesBackend.push(this.backendService.postSkill(this.character.id, skill));
        }
      }
  
      for (let id of this.idForDelete) {
        skillsToDelete.push(id);
      }
  
      // Mostrar el cuadro de diálogo de confirmación
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
      });
  
      // Verificar si se hizo clic en "Confirmar"
      if (result.isConfirmed) {
        for (let id of skillsToDelete) {
          observablesBackend.push(this.backendService.deleteSkill(id));
        }
  
        if (observablesBackend.length > 0) {
          await lastValueFrom(forkJoin(observablesBackend));
        }
  
        this.close();
      }
    } catch (e) {
      Swal.fire('Error', 'Se produjo un error al realizar la operación', 'error');
    }
  }
  
  closeSkillsAddModal(): void {
    this.isVisible = true;
  }

}
