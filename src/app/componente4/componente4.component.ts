import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface NaveSeleccionada {
  id: number;
  nombre: string;
  senal: string;
  detalleAbierto: boolean;
}

@Component({
  selector: 'app-componente4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './componente4.component.html',
  styleUrl: './componente4.component.css'
})
export class Componente4Component {
  titulo = 'Componente 4';

  formGeneral: FormGroup;
  puertosForm: FormGroup;

  resultadoNavesSeleccionadas: NaveSeleccionada[] = [];
  
  mostrarModal = false;
  acordeonAbierto = true;
  
  // Naves disponibles para el modal
  navesDisponibles = [
    { id: 1, nombre: 'BUQUE PACIFIC STAR', senal: 'ABCD-123' },
    { id: 2, nombre: 'NAVIERA DEL SUR', senal: 'EFGH-456' },
    { id: 3, nombre: 'CARGUERO ATLANTICO', senal: 'IJKL-789' },
    { id: 4, nombre: 'PESQUERO AUSTRAL', senal: 'MNOP-012' },
    { id: 5, nombre: 'FERRY CHILOE', senal: 'QRST-345' }
  ];

  paises = ['Chile', 'Argentina', 'Perú', 'Brasil', 'Uruguay'];
  
  puertosPorPais: { [key: string]: string[] } = {
    'Chile': ['Valparaíso', 'San Antonio', 'Talcahuano', 'Puerto Montt'],
    'Argentina': ['Buenos Aires', 'Rosario', 'Mar del Plata'],
    'Perú': ['Callao', 'Paita', 'Matarani'],
    'Brasil': ['Santos', 'Rio de Janeiro', 'Salvador'],
    'Uruguay': ['Montevideo', 'Punta del Este']
  };

  constructor(private fb: FormBuilder) {
    this.formGeneral = this.fb.group({
      emergencia: [''],
      enPuerto: [0]
    });

    this.puertosForm = this.fb.group({
      zarpePais: ['Chile'],
      zarpePuerto: [''],
      intermedioPais: ['Chile'],
      intermedioPuerto: [''],
      destinoPais: ['Chile'],
      destinoPuerto: ['']
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  seleccionarNave(nave: any) {
    // Verificar que no esté ya en la lista
    const existe = this.resultadoNavesSeleccionadas.find(n => n.id === nave.id);
    if (!existe) {
      this.resultadoNavesSeleccionadas.push({
        id: nave.id,
        nombre: nave.nombre,
        senal: nave.senal,
        detalleAbierto: false
      });
    }
    this.cerrarModal();
  }

  toggleDetalle(id: number) {
    const nave = this.resultadoNavesSeleccionadas.find(n => n.id === id);
    if (nave) {
      nave.detalleAbierto = !nave.detalleAbierto;
    }
  }

  eliminarResultado(id: number) {
    this.resultadoNavesSeleccionadas = this.resultadoNavesSeleccionadas.filter(n => n.id !== id);
  }

  onPaisChange(tipo: string) {
    // Resetear el puerto cuando cambia el país
    if (tipo === 'zarpe') {
      this.puertosForm.patchValue({ zarpePuerto: '' });
    } else if (tipo === 'intermedio') {
      this.puertosForm.patchValue({ intermedioPuerto: '' });
    } else if (tipo === 'destino') {
      this.puertosForm.patchValue({ destinoPuerto: '' });
    }
  }

  toggleAcordeon() {
    this.acordeonAbierto = !this.acordeonAbierto;
  }
}
