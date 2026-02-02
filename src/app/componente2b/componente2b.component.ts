import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-componente2b',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './componente2b.component.html',
  styleUrl: './componente2b.component.css'
})
export class Componente2bComponent {
  dato: string = '';

  obtenerDatos() {
    return { dato: this.dato };
  }
}
