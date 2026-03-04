import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RutService, RutResponse } from '../services/rut.service';

@Component({
  selector: 'app-componente6',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './componente6.component.html',
  styleUrl: './componente6.component.css',
  providers: [RutService]
})
export class Componente6Component implements OnInit {
  titulo = 'Solicitud de Acceso';
  rut: string = '';
  mensaje: string = '';
  error: string = '';
  cargando: boolean = false;
  rutExiste: boolean = false;
  exito: boolean = false;
  isBrowser: boolean = false;

  constructor(
    private rutService: RutService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // No hacer nada durante SSR
    if (!this.isBrowser) {
      return;
    }
  }

  buscarRut(): void {
    if (!this.isBrowser) {
      this.error = 'Esta funcionalidad solo está disponible en el navegador';
      return;
    }

    if (!this.validarRut()) {
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.error = '';
    this.rutExiste = false;
    this.exito = false;

    this.rutService.buscarRut(this.rut).subscribe({
      next: (response: RutResponse) => {
        this.cargando = false;
        if (response.existe) {
          this.rutExiste = true;
          this.mensaje = response.mensaje;
          this.error = '';
        } else {
          // El RUT no existe, proceder a guardar
          this.guardarRut();
        }
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.error || 'Error al buscar el RUT';
        this.mensaje = '';
      }
    });
  }

  guardarRut(): void {
    this.cargando = true;
    this.rutService.guardarRut(this.rut).subscribe({
      next: (response: RutResponse) => {
        this.cargando = false;
        if (response.exito) {
          this.exito = true;
          this.mensaje = response.mensaje;
          this.error = '';
          this.rut = '';
          this.rutExiste = false;
          
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => {
            this.exito = false;
          }, 5000);
        }
      },
      error: (err) => {
        this.cargando = false;
        if (err.error?.existe) {
          this.rutExiste = true;
          this.mensaje = err.error.error;
          this.error = '';
        } else {
          this.error = err.error?.error || 'Error al guardar el RUT';
          this.mensaje = '';
        }
      }
    });
  }

  validarRut(): boolean {
    if (!this.rut || this.rut.trim() === '') {
      this.error = 'Por favor ingresa un RUT';
      this.mensaje = '';
      return false;
    }

    // Validación básica de formato RUT
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-\d]{2}$|^\d{7,8}[-\d]{2}$/;
    if (!rutRegex.test(this.rut)) {
      this.error = 'Formato de RUT inválido. Ejemplo: 12.345.678-9 o 12345678-9';
      this.mensaje = '';
      return false;
    }

    this.error = '';
    return true;
  }

  limpiarFormulario(): void {
    this.rut = '';
    this.mensaje = '';
    this.error = '';
    this.rutExiste = false;
    this.exito = false;
  }
}

