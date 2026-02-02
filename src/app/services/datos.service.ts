import { Injectable } from '@angular/core';

export interface DatosPersonales {
  nombre: string;
  edad: number | null;
  email: string;
}

export interface DatosDireccion {
  calle: string;
  ciudad: string;
  codigoPostal: string;
}

export interface DatosPreferencias {
  idioma: string;
  tema: string;
  notificaciones: boolean;
}

export interface DatosCompletos {
  subcomponente1: DatosPersonales;
  subcomponente2: DatosDireccion;
  subcomponente3: DatosPreferencias;
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
