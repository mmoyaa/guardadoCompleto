import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Registro {
  nombre: string;
  apellido: string;
  rutBuscado: string;
  rutEncontrado: string;
}

@Component({
  selector: 'app-componente2c',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './componente2c.component.html',
  styleUrl: './componente2c.component.css'
})
export class Componente2cComponent implements OnInit {
  // Array de RUTs válidos para simulación
  rutsValidos: string[] = ['11111111-1', '22222222-2', '33333333-3'];
  
  // Formulario reactivo
  registroForm!: FormGroup;
  
  // RUT encontrado
  rutEncontrado: string = '';
  
  // Array de registros agregados (máximo 3)
  registros: Registro[] = [];
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rutBuscado: ['', Validators.required]
    });
    
    // Suscribirse a los cambios del campo rutBuscado para buscar automáticamente
    this.registroForm.get('rutBuscado')?.valueChanges.subscribe(valor => {
      this.buscarRut(valor);
    });
  }
  
  // Método para buscar RUT en el array
  buscarRut(rutBuscado: string): void {
    const rutLimpio = rutBuscado?.trim() || '';
    if (rutLimpio === '') {
      this.rutEncontrado = '';
      return;
    }
    
    const encontrado = this.rutsValidos.find(rut => rut === rutLimpio);
    this.rutEncontrado = encontrado || '';
  }
  
  // Método para validar si se puede agregar un registro
  puedeAgregar(): boolean {
    return this.registroForm.valid &&
           this.rutEncontrado !== '' &&
           this.registros.length < 3;
  }
  
  // Método para agregar un registro
  agregarRegistro(): void {
    if (!this.puedeAgregar()) {
      return;
    }
    
    const nuevoRegistro: Registro = {
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      rutBuscado: this.registroForm.value.rutBuscado,
      rutEncontrado: this.rutEncontrado
    };
    
    this.registros.push(nuevoRegistro);
    
    // Resetear el formulario
    this.registroForm.reset();
    this.rutEncontrado = '';
  }
  
  // Método para eliminar un registro
  eliminarRegistro(index: number): void {
    this.registros.splice(index, 1);
  }
  
  obtenerDatos() {
    return { 
      registros: this.registros 
    };
  }
}
