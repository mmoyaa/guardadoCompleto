import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type LayoutKey = 'A' | 'B' | 'C' | 'D';

type Actividad = {
  id: string;        // ojo: lo manejamos como string para que ngSwitch no falle
  nombre: string;
  idmedio: string;
  glmedio: string;
  layout: LayoutKey;
};

@Component({
  selector: 'app-componente5',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './componente5.component.html',
  styleUrl: './componente5.component.css'
})
export class Componente5Component {

  maxCaracteres = 500;

  // ✅ CATÁLOGO CENTRAL (aquí controlas todo como en tu PHP)
  actividades: Actividad[] = [
    { id: '19', nombre: 'APOYO MRCC CHILE - ASESORIA (SIN COSTO ASOCIADO)', idmedio: '',  glmedio: '',        layout: 'A' },
    { id: '21', nombre: 'ASISTENCIA MEDICO RADIAL',                        idmedio: '',  glmedio: '',        layout: 'A' },
    { id: '18', nombre: 'GESTIÓN CASO SAR (SIN COSTO ASOCIADO)',           idmedio: '',  glmedio: '',        layout: 'A' },
    { id: '1',  nombre: 'VERIFICACION DE ANTECEDENTES',                    idmedio: '',  glmedio: '',        layout: 'A' },
    { id: '11', nombre: 'ZARPE MEDIO CIVIL',                               idmedio: '',  glmedio: '',        layout: 'A' },

    { id: '15', nombre: 'DESPEGUE AERONAVE ALA FIJA',                      idmedio: '2', glmedio: 'AÉREO',   layout: 'B' },
    { id: '16', nombre: 'DESPEGUE AERONAVE ALA ROTATORIA',                 idmedio: '2', glmedio: 'AÉREO',   layout: 'B' },
    { id: '14', nombre: 'PATRULLAJE TERRESTRE',                            idmedio: '3', glmedio: 'TERRESTRE',layout: 'B' },
    { id: '20', nombre: 'REMOLQUE',                                        idmedio: '1', glmedio: 'FLOTE',   layout: 'B' },
    { id: '5',  nombre: 'ZARPE UNIDAD MARÍTIMA',                           idmedio: '1', glmedio: 'FLOTE',   layout: 'B' },
    { id: '6',  nombre: 'ZARPE UNIDAD NAVAL',                              idmedio: '1', glmedio: 'FLOTE',   layout: 'B' },

    { id: '17', nombre: 'DESPEGUE MEDIO AÉREO CIVIL',                      idmedio: '2', glmedio: 'AÉREO',   layout: 'C' },
    { id: '13', nombre: 'DESVÍO DE NAVE CIVIL',                            idmedio: '',  glmedio: '',        layout: 'C' },
    { id: '3',  nombre: 'DESVIÓ DE UNIDAD NAVAL',                          idmedio: '1', glmedio: 'FLOTE',   layout: 'C' },
    { id: '8',  nombre: 'DESVÍO UNIDAD MARÍTIMA',                          idmedio: '1', glmedio: 'FLOTE',   layout: 'C' },

    // ✅ el caso de tu foto: ENLACE... (value=4) usa FC Acción + Detalle
    { id: '4',  nombre: 'ENLACE DE COMUNICACIONES CON MEDIOS EN EL ÁREA',  idmedio: '',  glmedio: '',        layout: 'D' },
  ];

  // lookup rápido
  private actividadById = new Map<string, Actividad>(this.actividades.map(a => [a.id, a]));

  // acordeón items
  openMap = new Set<number>();

  operacionesFuturasForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.operacionesFuturasForm = this.fb.group({
      // selector
      reparticion: ['', Validators.required],

      // campos del form principal
      fechaETD: [''],
      fechaETA: [''],
      fechaAccion: [''],   // 👈 para layout D
      detalle: [''],

      // lista agregada
      reparticiones: this.fb.array<FormGroup>([]),
    });
  }

  // ===== getters =====
  get reparticionesFA(): FormArray<FormGroup> {
    return this.operacionesFuturasForm.get('reparticiones') as FormArray<FormGroup>;
  }

  get layoutActual(): LayoutKey | '' {
    const id = (this.operacionesFuturasForm.get('reparticion')?.value ?? '').toString();
    return this.actividadById.get(id)?.layout ?? '';
  }

  get caracteresRestantesForm(): number {
    const val = (this.operacionesFuturasForm.get('detalle')?.value ?? '').toString();
    return this.maxCaracteres - val.length;
  }

  // ===== acordeón =====
  toggle(i: number) {
    this.openMap.has(i) ? this.openMap.delete(i) : this.openMap.add(i);
  }

  isOpen(i: number) {
    return this.openMap.has(i);
  }

  // ===== agregar / eliminar =====
  agregarReparticion() {
    const id = (this.operacionesFuturasForm.get('reparticion')?.value ?? '').toString().trim();
    if (!id) return;

    const act = this.actividadById.get(id);
    if (!act) return;

    // evita duplicados
    const yaExiste = this.reparticionesFA.controls.some(c => (c.get('id')?.value ?? '').toString() === id);
    if (yaExiste) {
      this.operacionesFuturasForm.patchValue({ reparticion: '' });
      return;
    }

    // crea item con layout correspondiente
    const item = this.fb.group({
      id: [act.id, Validators.required],
      nombre: [act.nombre, Validators.required],
      idmedio: [act.idmedio],
      glmedio: [act.glmedio],
      layout: [act.layout, Validators.required],

      // campos guardados (todos existen, pero algunos layouts no los usan)
      fechaETD: [this.operacionesFuturasForm.get('fechaETD')?.value || ''],
      fechaETA: [this.operacionesFuturasForm.get('fechaETA')?.value || ''],
      fechaAccion: [this.operacionesFuturasForm.get('fechaAccion')?.value || ''],
      detalle: [this.operacionesFuturasForm.get('detalle')?.value || ''],
    });

    this.reparticionesFA.push(item);

    // abre el nuevo item
    this.openMap.add(this.reparticionesFA.length - 1);

    // limpia solo el selector (y si quieres también fecha/detalle)
    this.operacionesFuturasForm.patchValue({ reparticion: '' });
  }

  eliminarReparticion(i: number) {
    this.reparticionesFA.removeAt(i);
    this.openMap.delete(i);
  }
}