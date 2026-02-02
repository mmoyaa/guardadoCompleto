# guardadoCompleto

Sistema de guardado con múltiples componentes en Angular

## Descripción

Este proyecto implementa una estructura de componentes donde:
- **Componente 2** actúa como componente principal que contiene tres subcomponentes (2a, 2b, 2c)
- Cada subcomponente tiene su propio formulario con un input
- El botón "Guardar Todo" en el Componente 2 recopila y guarda los datos de todos los subcomponentes simultáneamente
- Utiliza `@ViewChild` para acceder a los métodos de los componentes hijos

## Características

✅ Navegación entre componentes con enrutamiento  
✅ Sistema de guardado centralizado mediante servicio  
✅ Diseño moderno con gradientes de colores  
✅ Comunicación padre-hijo mediante ViewChild  
✅ Estilos diferenciados por componente (morado, amarillo, verde)  

## Desarrollo

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

### Servidor de desarrollo

Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`.

### Estructura de componentes

```
App Component
├── Componente 1 (Bienvenida)
└── Componente 2 (Formulario Principal)
	├── Componente 2a (Input morado)
	├── Componente 2b (Input amarillo)
	└── Componente 2c (Input verde)
```

### Cómo usar

1. Navega al **Componente 2**
2. Llena los inputs en los tres subcomponentes (2a, 2b, 2c)
3. Presiona el botón **"💾 Guardar Todo"**
4. Los datos se guardarán y se mostrarán en la consola del navegador

## Build

Ejecuta `ng build` para construir el proyecto. Los artefactos se almacenarán en el directorio `dist/`.
