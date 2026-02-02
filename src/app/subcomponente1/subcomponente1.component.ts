import { Component } from '@angular/core';

@Component({
  selector: 'app-subcomponente1',
  standalone: false,
  template: `
    <div class="subcomponent">
      <h3>Subcomponente 1 - Información Personal</h3>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" [(ngModel)]="datos.nombre" placeholder="Ingrese su nombre">
      </div>
      <div class="form-group">
        <label for="edad">Edad:</label>
        <input type="number" id="edad" [(ngModel)]="datos.edad" placeholder="Ingrese su edad">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" [(ngModel)]="datos.email" placeholder="Ingrese su email">
      </div>
    </div>
  `,
  styles: []
})
export class Subcomponente1Component {
  datos = {
    nombre: '',
    edad: null,
    email: ''
  };

  obtenerDatos() {
    return { ...this.datos };
  }
}
