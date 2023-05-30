import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IInventario } from 'src/app/interfaces/game.interfaces';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-character-inventory-add-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzSpinModule,
    FormsModule,
    NzCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './character-inventory-add-modal.component.html',
  styleUrls: ['./character-inventory-add-modal.component.css']
})
export class CharacterInventoryAddModalComponent implements OnInit {

  isVisible = false;
  formGroup: UntypedFormGroup;

  @Output() createEvent = new EventEmitter<IInventario>();
  @Output() closeEvent = new EventEmitter<any>();

  constructor(
    private readonly fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
      this.formGroup = this.fb.group({
        nombre: [''],
        peso: ['0'],
        consumible: [false],
        valor: ['0']
      });
  }

  resetForm() {
    this.formGroup.get('nombre').setValue('');
    this.formGroup.get('peso').setValue('0');
    this.formGroup.get('consumible').setValue(false);
    this.formGroup.get('valor').setValue('0');
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

  createNewObject() {
    const value: IInventario = {
      nombre: this.formGroup.get('nombre').value,
      peso: this.formGroup.get('peso').value,
      consumible: this.formGroup.get('consumible').value ? 1 : 0,
      valor: this.formGroup.get('valor').value
    };
    console.log(value);
    this.close();
    this.createEvent.emit(value);
  }

}
