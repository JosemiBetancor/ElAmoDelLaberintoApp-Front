import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IHabilidades, IInventario } from 'src/app/interfaces/game.interfaces';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@Component({
  selector: 'app-character-skills-add-modal',
  standalone: true,
  imports: [ CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzSpinModule,
    FormsModule,
    NzCheckboxModule,
    ReactiveFormsModule,],
  templateUrl: './character-skills-add-modal.component.html',
  styleUrls: ['./character-skills-add-modal.component.css']
})
export class CharacterSkillsAddModalComponent {
  isVisible = false;
  formGroup: UntypedFormGroup;

  @Output() createEvent = new EventEmitter<IHabilidades>();
  @Output() closeEvent = new EventEmitter<any>();

  constructor(
    private readonly fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
      this.formGroup = this.fb.group({
        nombre: [''],
        interpretativa: [false],
      });
  }

  resetForm() {
    this.formGroup.get('nombre').setValue('');
    this.formGroup.get('interpretativa').setValue(false);
  }

  openModal() {
    this.resetForm();
    this.isVisible = true;
  }

  close() {
    this.resetForm();
    this.isVisible = false;
    this.closeEvent.emit();
  }

  createNewSkill() {
    const value: IHabilidades = {
      nombre: this.formGroup.get('nombre').value,
      interpretativas: this.formGroup.get('interpretativa').value ? 1 : 0,
    };
    console.log(value);
    this.close();
    this.createEvent.emit(value);
  }

}
