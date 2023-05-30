import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ICharacter, IInventario } from 'src/app/interfaces/game.interfaces';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-character-add-character-modal',
  standalone: true,
  imports: [ CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzSpinModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './character-add-character-modal.component.html',
  styleUrls: ['./character-add-character-modal.component.css']
})
export class CharacterAddCharacterModalComponent {

  isVisible = false;
  formGroup: UntypedFormGroup;
  @Output() createEvent = new EventEmitter<ICharacter>();
  @Output() closeEvent = new EventEmitter<any>();

  constructor(
    private readonly fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: [''],
      clase: [''],
      experiencia: ['0'],
      alineamiento: [''],
      nivel: ['1'],
      claseArmadura: ['0'],
      vida: ['0'],
    });
}
resetForm() {
  this.formGroup.get('nombre').setValue('');
  this.formGroup.get('clase').setValue('');
  this.formGroup.get('experiencia').setValue('0');
  this.formGroup.get('alineamiento').setValue('');
  this.formGroup.get('nivel').setValue('1');
  this.formGroup.get('claseArmadura').setValue('0');
  this.formGroup.get('vida').setValue('0');
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
createNewCharacter() {
  const value: ICharacter = {
    nombre: this.formGroup.get('nombre').value,
    clase: this.formGroup.get('clase').value,
    experiencia: this.formGroup.get('experiencia').value,
    alineamiento: this.formGroup.get('alineamiento').value,
    nivel: this.formGroup.get('nivel').value,
    claseArmadura: this.formGroup.get('claseArmadura').value,
    vida: this.formGroup.get('vida').value,
    imagen:'http://localhost:8083/media/images.jpeg',
  };
  console.log(value);
  this.close();
  this.createEvent.emit(value);
}
}
