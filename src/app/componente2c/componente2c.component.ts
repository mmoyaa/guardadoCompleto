import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-componente2c',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './componente2c.component.html',
  styleUrl: './componente2c.component.css'
})
export class Componente2cComponent {
  dato: string = '';

  obtenerDatos() {
    return { dato: this.dato };
  }
}
