import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Componente1Component } from './componente1/componente1.component';
import { Componente2Component } from './componente2/componente2.component';
import { Subcomponente1Component } from './subcomponente1/subcomponente1.component';
import { Subcomponente2Component } from './subcomponente2/subcomponente2.component';
import { Subcomponente3Component } from './subcomponente3/subcomponente3.component';
import { DatosService } from './services/datos.service';

@NgModule({
  declarations: [
    AppComponent,
    Componente1Component,
    Componente2Component,
    Subcomponente1Component,
    Subcomponente2Component,
    Subcomponente3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
