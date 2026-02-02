import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private datosGuardados: any[] = [];

  constructor() { }

  guardarDatos(datos: any) {
    this.datosGuardados.push({
      fecha: new Date(),
      datos: datos
    });
    console.log('Datos guardados:', datos);
    console.log('Historial completo:', this.datosGuardados);
  }

  obtenerDatosGuardados() {
    return this.datosGuardados;
  }
}
