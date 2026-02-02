import { Component } from '@angular/core';
import { DatosService, DatosCompletos } from '../services/datos.service';

@Component({
  selector: 'app-componente2',
  standalone: false,
  template: `
    <div class="container">
      <div class="data-collection-container">
        <h2>Componente 2 - Visualización de Datos Guardados</h2>
        <p>Este componente muestra los datos que han sido guardados</p>
        
        <div *ngIf="datosGuardados.length === 0" style="padding: 20px; text-align: center; color: #666;">
          <p>No hay datos guardados aún. Ve al Componente 1 para guardar datos.</p>
        </div>
        
        <div *ngIf="datosGuardados.length > 0">
          <h3>Total de registros: {{ datosGuardados.length }}</h3>
          
          <div *ngFor="let datos of datosGuardados; let i = index" class="subcomponent" style="margin-bottom: 20px;">
            <h3>Registro #{{ i + 1 }} - {{ datos.timestamp | date:'short' }}</h3>
            
            <div style="margin-bottom: 15px;">
              <h4>Información Personal:</h4>
              <p><strong>Nombre:</strong> {{ datos.subcomponente1.nombre || 'N/A' }}</p>
              <p><strong>Edad:</strong> {{ datos.subcomponente1.edad || 'N/A' }}</p>
              <p><strong>Email:</strong> {{ datos.subcomponente1.email || 'N/A' }}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h4>Dirección:</h4>
              <p><strong>Calle:</strong> {{ datos.subcomponente2.calle || 'N/A' }}</p>
              <p><strong>Ciudad:</strong> {{ datos.subcomponente2.ciudad || 'N/A' }}</p>
              <p><strong>Código Postal:</strong> {{ datos.subcomponente2.codigoPostal || 'N/A' }}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h4>Preferencias:</h4>
              <p><strong>Idioma:</strong> {{ datos.subcomponente3.idioma || 'N/A' }}</p>
              <p><strong>Tema:</strong> {{ datos.subcomponente3.tema || 'N/A' }}</p>
              <p><strong>Notificaciones:</strong> {{ datos.subcomponente3.notificaciones ? 'Sí' : 'No' }}</p>
            </div>
          </div>
        </div>
        
        <button class="btn" (click)="actualizarDatos()">Actualizar Datos</button>
      </div>
    </div>
  `,
  styles: [`
    h4 {
      color: #4CAF50;
      margin: 10px 0 5px 0;
    }
    
    p {
      margin: 5px 0;
    }
  `]
})
export class Componente2Component {
  datosGuardados: DatosCompletos[] = [];

  constructor(private datosService: DatosService) {
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.datosGuardados = this.datosService.obtenerTodosLosDatos();
  }
}
