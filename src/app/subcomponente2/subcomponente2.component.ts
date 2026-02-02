import { Component } from '@angular/core';

@Component({
  selector: 'app-subcomponente2',
  standalone: false,
  template: `
    <div class="subcomponent">
      <h3>Subcomponente 2 - Dirección</h3>
      <div class="form-group">
        <label for="calle">Calle:</label>
        <input type="text" id="calle" [(ngModel)]="datos.calle" placeholder="Ingrese su calle">
      </div>
      <div class="form-group">
        <label for="ciudad">Ciudad:</label>
        <input type="text" id="ciudad" [(ngModel)]="datos.ciudad" placeholder="Ingrese su ciudad">
      </div>
      <div class="form-group">
        <label for="codigoPostal">Código Postal:</label>
        <input type="text" id="codigoPostal" [(ngModel)]="datos.codigoPostal" placeholder="Ingrese su código postal">
      </div>
    </div>
  `,
  styles: []
})
export class Subcomponente2Component {
  datos = {
    calle: '',
    ciudad: '',
    codigoPostal: ''
  };

  obtenerDatos() {
    return { ...this.datos };
  }
}
