import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

type ComunicacionRow = {
  tipo: string;
  tiempo: string; // "HH:MM"
};

@Component({
  selector: 'app-componente2a',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './componente2a.component.html',
  styleUrl: './componente2a.component.css'
})
export class Componente2aComponent {
  tipos: string[] = ['HH/CELULAR', 'VHF', 'HF', 'SATELITAL', 'OTRO'];
  dato: string = '';

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      comunicacionNueva: this.fb.group({
        tipo: ['', Validators.required],
        tiempo: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):[0-5]\d$/)]], // HH:MM
      }),
      comunicaciones: this.fb.array<FormGroup>([])
    });
  }

  // ---- getters cómodos
  get comunicaciones(): FormArray<FormGroup> {
    return this.form.get('comunicaciones') as FormArray<FormGroup>;
  }

  get comunicacionNueva(): FormGroup {
    return this.form.get('comunicacionNueva') as FormGroup;
  }

  // ---- acciones
  agregar(): void {
    if (this.comunicacionNueva.invalid) {
      this.comunicacionNueva.markAllAsTouched();
      return;
    }

    const value = this.comunicacionNueva.value as ComunicacionRow;

    // si quieres evitar duplicados exactos:
    const existe = this.comunicaciones.controls.some(ctrl =>
      ctrl.get('tipo')?.value === value.tipo &&
      ctrl.get('tiempo')?.value === value.tiempo
    );
    if (existe) return;

    const row = this.fb.group({
      tipo: [value.tipo, Validators.required],
      tiempo: [value.tiempo, Validators.required],
    });

    this.comunicaciones.push(row);

    // limpiar para siguiente ingreso
    this.comunicacionNueva.reset();
  }

  eliminar(index: number): void {
    this.comunicaciones.removeAt(index);
  }

  obtenerDatos() {
    return {
      dato: this.dato,
      comunicaciones: this.comunicaciones.value
    };
  }

  // opcional: para *ngFor trackBy
  trackByIndex = (i: number) => i;
}