import { Component, ViewChild } from '@angular/core';
import { Componente2aComponent } from '../componente2a/componente2a.component';
import { Componente2bComponent } from '../componente2b/componente2b.component';
import { Componente2cComponent } from '../componente2c/componente2c.component';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-componente2',
  standalone: true,
  imports: [Componente2aComponent, Componente2bComponent, Componente2cComponent],
  templateUrl: './componente2.component.html',
  styleUrl: './componente2.component.css'
})
export class Componente2Component {
  @ViewChild(Componente2aComponent) componente2a!: Componente2aComponent;
  @ViewChild(Componente2bComponent) componente2b!: Componente2bComponent;
  @ViewChild(Componente2cComponent) componente2c!: Componente2cComponent;

  constructor(private datosService: DatosService) {}

  guardarTodo() {
    const datosCompletos = {
      componente2a: this.componente2a.obtenerDatos(),
      componente2b: this.componente2b.obtenerDatos(),
      componente2c: this.componente2c.obtenerDatos()
    };
    
    this.datosService.guardarDatos(datosCompletos);
    alert('¡Datos guardados exitosamente! Revisa la consola para ver los datos.');
  }
}
