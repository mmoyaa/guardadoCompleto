import { Component, ViewChild } from '@angular/core';
import { Subcomponente1Component } from '../subcomponente1/subcomponente1.component';
import { Subcomponente2Component } from '../subcomponente2/subcomponente2.component';
import { Subcomponente3Component } from '../subcomponente3/subcomponente3.component';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-componente1',
  standalone: false,
  template: `
    <div class="container">
      <div class="data-collection-container">
        <h2>Componente 1 - Recopilación de Datos</h2>
        <p>Este componente recopila los datos de los 3 subcomponentes simultáneamente</p>
        
        <app-subcomponente1></app-subcomponente1>
        <app-subcomponente2></app-subcomponente2>
        <app-subcomponente3></app-subcomponente3>
        
        <button class="btn" (click)="guardarDatos()">Guardar Datos Completos</button>
      </div>
    </div>
  `,
  styles: []
})
export class Componente1Component {
  @ViewChild(Subcomponente1Component) subcomp1!: Subcomponente1Component;
  @ViewChild(Subcomponente2Component) subcomp2!: Subcomponente2Component;
  @ViewChild(Subcomponente3Component) subcomp3!: Subcomponente3Component;

  constructor(private datosService: DatosService) { }

  guardarDatos() {
    // Recopila los datos de los 3 subcomponentes simultáneamente
    const datosCompletos = {
      subcomponente1: this.subcomp1.obtenerDatos(),
      subcomponente2: this.subcomp2.obtenerDatos(),
      subcomponente3: this.subcomp3.obtenerDatos(),
      timestamp: new Date() // Timestamp will be updated by the service
    };

    // Los empaqueta en un objeto completo y los guarda mediante el servicio DatosService
    this.datosService.guardarDatos(datosCompletos);

    // Registra los datos en la consola del navegador
    console.log('Datos completos guardados:', datosCompletos);

    // Muestra una alerta de confirmación
    alert('¡Datos guardados exitosamente!');
  }
}
