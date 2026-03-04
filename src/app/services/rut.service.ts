import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface RutResponse {
  existe?: boolean;
  exito?: boolean;
  mensaje: string;
  datos?: any;
  error?: string;
  emailEnviado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RutService {
  private apiUrl = '/api/rut';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  buscarRut(rut: string): Observable<RutResponse> {
    if (!this.isBrowser) {
      // Retornar observable vacío durante SSR para evitar llamadas HTTP
      console.log('RUT service: bypassing HTTP call during SSR');
      return of({
        existe: false,
        mensaje: 'Servicio no disponible durante renderización en servidor',
        error: 'SSR Mode'
      });
    }
    return this.http.post<RutResponse>(`${this.apiUrl}/buscar`, { rut });
  }

  guardarRut(rut: string): Observable<RutResponse> {
    if (!this.isBrowser) {
      // Retornar observable vacío durante SSR para evitar llamadas HTTP
      console.log('RUT service: bypassing HTTP call during SSR');
      return of({
        exito: false,
        mensaje: 'Servicio no disponible durante renderización en servidor',
        error: 'SSR Mode'
      });
    }
    return this.http.post<RutResponse>(`${this.apiUrl}/guardar`, { rut });
  }
}

