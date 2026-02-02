import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-componente2a',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './componente2a.component.html',
  styleUrl: './componente2a.component.css'
})
export class Componente2aComponent {
  dato: string = '';

  obtenerDatos() {
    return { dato: this.dato };
  }
}
