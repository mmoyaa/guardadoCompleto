import { Component } from '@angular/core';

@Component({
  selector: 'app-subcomponente3',
  standalone: false,
  template: `
    <div class="subcomponent">
      <h3>Subcomponente 3 - Preferencias</h3>
      <div class="form-group">
        <label for="idioma">Idioma:</label>
        <select id="idioma" [(ngModel)]="datos.idioma">
          <option value="">Seleccione un idioma</option>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
        </select>
      </div>
      <div class="form-group">
        <label for="tema">Tema:</label>
        <select id="tema" [(ngModel)]="datos.tema">
          <option value="">Seleccione un tema</option>
          <option value="claro">Claro</option>
          <option value="oscuro">Oscuro</option>
        </select>
      </div>
      <div class="form-group">
        <label for="notificaciones">Notificaciones:</label>
        <input type="checkbox" id="notificaciones" [(ngModel)]="datos.notificaciones">
        <label for="notificaciones" style="display: inline; margin-left: 5px;">Recibir notificaciones</label>
      </div>
    </div>
  `,
  styles: []
})
export class Subcomponente3Component {
  datos = {
    idioma: '',
    tema: '',
    notificaciones: false
  };

  obtenerDatos() {
    return { ...this.datos };
  }
}
