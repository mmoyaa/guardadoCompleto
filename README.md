# guardadoCompleto

Aplicación Angular completa para recopilación y guardado de datos de múltiples subcomponentes.

## Características

### Recopilación de Datos
- **Componente 1**: Recopila datos de 3 subcomponentes simultáneamente
  - Subcomponente 1: Información Personal (Nombre, Edad, Email)
  - Subcomponente 2: Dirección (Calle, Ciudad, Código Postal)
  - Subcomponente 3: Preferencias (Idioma, Tema, Notificaciones)

### Funcionalidades
- ✅ Recopilación simultánea de datos desde los 3 subcomponentes
- ✅ Empaquetado de datos en un objeto completo
- ✅ Guardado mediante DatosService
- ✅ Alerta de confirmación al guardar
- ✅ Registro en consola del navegador
- ✅ Navegación entre componentes con resaltado visual
- ✅ Visualización de datos guardados en Componente 2

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Compilación

```bash
npm run build
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── componente1/          # Componente de recopilación de datos
│   ├── componente2/          # Componente de visualización de datos
│   ├── subcomponente1/       # Información Personal
│   ├── subcomponente2/       # Dirección
│   ├── subcomponente3/       # Preferencias
│   ├── services/             # DatosService para persistencia
│   ├── app.component.ts      # Componente principal con navegación
│   ├── app.module.ts         # Módulo principal
│   └── app-routing.module.ts # Configuración de rutas
├── index.html                # Página principal
├── main.ts                   # Punto de entrada
└── styles.css                # Estilos globales
```

## Tecnologías Utilizadas

- Angular 18
- TypeScript 5.5
- RxJS 7
- CSS3

## Navegación

- **Componente 1**: `/componente1` - Formulario de recopilación de datos
- **Componente 2**: `/componente2` - Visualización de datos guardados

El componente activo se resalta en verde en la barra de navegación superior.
