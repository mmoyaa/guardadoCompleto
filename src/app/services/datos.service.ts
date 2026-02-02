import { Injectable } from '@angular/core';

export interface DatosCompletos {
  subcomponente1: any;
  subcomponente2: any;
  subcomponente3: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private datosGuardados: DatosCompletos[] = [];

  constructor() { }

  guardarDatos(datos: DatosCompletos): void {
    datos.timestamp = new Date();
    this.datosGuardados.push(datos);
    console.log('Datos guardados en DatosService:', datos);
  }

  obtenerTodosLosDatos(): DatosCompletos[] {
    return this.datosGuardados;
  }

  obtenerUltimosDatos(): DatosCompletos | undefined {
    return this.datosGuardados[this.datosGuardados.length - 1];
  }
}
