import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <div class="navbar">
      <a routerLink="/componente1" routerLinkActive="active">Componente 1</a>
      <a routerLink="/componente2" routerLinkActive="active">Componente 2</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Guardado Completo';
}
