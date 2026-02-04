import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './componente3.component.html',
  styleUrl: './componente3.component.css'
})
export class Componente3Component {
  titulo = 'Componente 3 - Reparticiones';

  reparticionesForm: FormGroup;

  listaReparticiones = [
    'MRSC HANGA ROA',
    'MRCC VALPARAISO',
    'CAPUERTO IQUIQUE',
    'FARO EVANGELISTAS'
  ];

  zonasNavales = [
    'Zona Naval I',
    'Zona Naval II',
    'Zona Naval III',
    'Zona Naval IV',
    'Zona Naval V'
  ];

  reparticiones: string[] = [];

  constructor(private fb: FormBuilder){
    this.reparticionesForm = this.fb.group({
      reparticion: [''],
      zonaControl: ['No'],
      zonaNaval: [''],
      fechaHoraTomaControl: [''],
      nroMensajeNaval: ['']
    });
  }

  agregarReparticion(){
    const rep = this.reparticionesForm.value.reparticion;

    if(rep && !this.reparticiones.includes(rep)){
      this.reparticiones.push(rep);
    }
  }

  eliminarReparticion(index:number){
    this.reparticiones.splice(index,1);
  }
}