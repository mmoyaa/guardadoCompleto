# Sistema de Solicitud de Acceso - Guía de Configuración

## Requisitos Previos

### 1. Instalar Dependencias
Ejecuta el siguiente comando en la raíz del proyecto:
```bash
npm install
```

Esto instalará:
- `sqlite3` - Base de datos SQLite
- `nodemailer` - Servicio de envío de emails
- `@types/node` - Typings para Node.js

### 2. Configurar Envío de Emails (Gmail)

#### Paso 1: Habilitar la autenticación de dos factores en tu cuenta de Google
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. En el menú izquierdo, selecciona "Seguridad"
3. Activa la "Verificación en dos pasos"

#### Paso 2: Crear una contraseña de aplicación
1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona "Mail" como aplicación
3. Selecciona "Windows PC" (o tu dispositivo)
4. Google generará una contraseña de 16 caracteres
5. Copia esa contraseña

#### Paso 3: Configurar la variable de entorno
1. En la raíz del proyecto, crea un archivo `.env`:
```
EMAIL_PASSWORD=tu_contraseña_de_16_caracteres
```

2. O establece la variable de entorno en Windows:
```powershell
$env:EMAIL_PASSWORD = "tu_contraseña_de_16_caracteres"
```

### 3. Estructura de la Base de Datos

Se crea automáticamente una tabla `rut_solicitudes` con:
- `id` - Identificador único
- `rut` - RUT del solicitante (único)
- `fecha_solicitud` - Fecha y hora de la solicitud
- `estado` - Estado de la solicitud (default: 'activa')
- `email_enviado` - Flag para confirmar envío de email

### 4. Ejecutar la Aplicación

```bash
npm start
```

Luego accede a:
- Frontend: http://localhost:4200
- El componente está en el menú bajo "Componente 6"

## Flujo de la Aplicación

1. Usuario ingresa un RUT en el formulario
2. El sistema busca si el RUT existe en la BD
3. Si existe: Muestra mensaje "Existe el RUT ingresado"
4. Si no existe:
   - Guarda el RUT en la BD
   - Envía un email automático a `paralatele648@gmail.com`
   - Muestra mensaje de éxito con confirmación

## Endpoints de la API

### POST `/api/rut/buscar`
Busca si un RUT existe en la base de datos

**Request:**
```json
{
  "rut": "12.345.678-9"
}
```

**Response si existe:**
```json
{
  "existe": true,
  "mensaje": "Existe el RUT ingresado",
  "datos": { ... }
}
```

**Response si no existe:**
```json
{
  "existe": false,
  "mensaje": "RUT no encontrado. Se guardará en la base de datos"
}
```

### POST `/api/rut/guardar`
Guarda un nuevo RUT y envía email de confirmación

**Request:**
```json
{
  "rut": "12.345.678-9"
}
```

**Response si éxito:**
```json
{
  "exito": true,
  "mensaje": "Solicitud de acceso generada. Se envió un correo de confirmación.",
  "datos": { "id": 1, "rut": "12.345.678-9" },
  "emailEnviado": true
}
```

## Validación de RUT

El sistema acepta dos formatos:
- Con puntos y guión: `12.345.678-9`
- Solo números y guión: `12345678-9`

## Solución de Problemas

### El email no se envía
1. Verifica que habilitaste la autenticación de dos factores
2. Verifica que creaste una contraseña de aplicación
3. Verifica que la variable de entorno `EMAIL_PASSWORD` está configurada
4. Revisa los logs de la consola para mensajes de error

### Error de base de datos
- La BD se crea automáticamente en `solicitudes.db`
- Si hay problemas, elimina el archivo `solicitudes.db` y reinicia la aplicación

### Error de RUT duplicado
- Si intentas guardar un RUT existente, recibirás el error "Existe el RUT ingresado"
- Esto es por diseño para mantener la integridad de datos

## Notas Adicionales

- El email se envía desde `paralatele648@gmail.com`
- Puedes cambiar la dirección destino editando `email-service.ts`
- Los timestamps se guardan en UTC pero se muestran en zona horaria local
