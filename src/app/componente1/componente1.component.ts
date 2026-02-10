import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-componente1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './componente1.component.html',
  styleUrl: './componente1.component.css'
})
export class Componente1Component  implements AfterViewInit, OnDestroy{
  private map!: import('leaflet').Map;
  private marker!: import('leaflet').Marker;
  private myMarker!: import('leaflet').Marker;

  private sub?: Subscription;

  // rangos típicos
  latGrados = Array.from({ length: 91 }, (_, i) => i);   // 0..90
  lonGrados = Array.from({ length: 181 }, (_, i) => i);  // 0..180
  mmss = Array.from({ length: 60 }, (_, i) => i);        // 0..59

  titulo = 'Ubicación geográfica';

  // Coordenada actual del “mi ubicación”
  private myLatLng?: import('leaflet').LatLng;

  private L?: typeof import('leaflet');

  geoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.geoForm = this.fb.group({
      obtenidoPor: [''],
      cartaRef: [''],

      latG: [18],
      latM: [0],
      latS: [0],
      latHemi: ['S'],

      lonG: [50],
      lonM: [0],
      lonS: [0],
      lonHemi: ['W'],
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.L = await import('leaflet');
    this.initMap();
    this.initMarkers();
    this.tryGeolocation();

    // Si quieres que al cambiar inputs se actualice automáticamente:
    this.sub = this.geoForm.valueChanges.subscribe(() => {
      this.updateMarkerFromForm(false); // false = no recentrar agresivo
    });

    // Primera carga con valores iniciales
    this.updateMarkerFromForm(true);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.map?.remove();
  }

  private initMap() {
    const L = this.L!;
    this.map = L.map('map', { zoomControl: true }).setView([-33.45, -70.66], 12); // fallback

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private initMarkers() {
    const L = this.L!;
    // Ícono Leaflet (fix común cuando no aparecen los marcadores en bundlers)
    const icon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    this.marker = L.marker([0, 0], { icon }).addTo(this.map).bindPopup('Ubicación ingresada');

    this.myMarker = L.marker([0, 0], { icon }).addTo(this.map).bindPopup('Mi ubicación');
    this.myMarker.setOpacity(0); // oculto hasta tener geolocalización
  }

  private tryGeolocation() {
    const L = this.L!;
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        this.myLatLng = L.latLng(lat, lon);

        this.myMarker.setLatLng(this.myLatLng);
        this.myMarker.setOpacity(1);

        // al iniciar: centrar en mi ubicación
        this.map.setView(this.myLatLng, 15);
      },
      (err) => {
        // si el usuario niega permisos, no pasa nada: queda el fallback
        console.warn('Geolocalización no disponible/denegada', err);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  irAMiUbicacion() {
    if (!this.myLatLng) return;
    this.map.setView(this.myLatLng, 18);
    this.myMarker.openPopup();
  }

  centrarConInputs() {
    this.updateMarkerFromForm(true);
  }

  private updateMarkerFromForm(recenter: boolean) {
    if (!this.L) return;
    const L = this.L;
    const v = this.geoForm.getRawValue();

    const lat = this.dmsToDecimal(+v.latG!, +v.latM!, +v.latS!, v.latHemi!);
    const lon = this.dmsToDecimal(+v.lonG!, +v.lonM!, +v.lonS!, v.lonHemi!);

    // Validaciones simples
    if (Number.isNaN(lat) || Number.isNaN(lon)) return;
    if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return;

    const ll = L.latLng(lat, lon);
    this.marker.setLatLng(ll);

    if (recenter) {
      this.map.setView(ll, 15);
      this.marker.openPopup();
    }
  }

  // Convierte Grados/Minutos/Segundos a decimal + aplica hemisferio
  private dmsToDecimal(g: number, m: number, s: number, hemi: string): number {
    const dec = Math.abs(g) + (m / 60) + (s / 3600);

    // N y E positivos, S y W negativos
    if (hemi === 'S' || hemi === 'W') return -dec;
    return dec;
  }
}

