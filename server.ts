import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { initializeDatabase, searchRut, saveRut, markEmailAsSent } from './db.js';
import { sendAccessRequestEmail } from './email-service.js';

// Initialize database
await initializeDatabase();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Middleware para parsear JSON
  server.use(express.json());

  // API Endpoints para RUT - ANTES que archivos estáticos
  server.post('/api/rut/buscar', async (req, res) => {
    try {
      const { rut } = req.body;
      
      if (!rut || rut.trim() === '') {
        return res.status(400).json({ error: 'RUT es requerido' });
      }

      const existe = await searchRut(rut);
      
      if (existe) {
        return res.json({
          existe: true,
          mensaje: 'Existe el RUT ingresado',
          datos: existe
        });
      } else {
        return res.json({
          existe: false,
          mensaje: 'RUT no encontrado. Se guardará en la base de datos'
        });
      }
    } catch (error) {
      console.error('Error en búsqueda de RUT:', error);
      return res.status(500).json({ error: 'Error al buscar el RUT' });
    }
  });

  server.post('/api/rut/guardar', async (req, res) => {
    try {
      const { rut } = req.body;
      
      if (!rut || rut.trim() === '') {
        return res.status(400).json({ error: 'RUT es requerido' });
      }

      // Verificar si ya existe
      const existe = await searchRut(rut);
      if (existe) {
        return res.status(400).json({ 
          error: 'Existe el RUT ingresado',
          existe: true
        });
      }

      // Guardar el RUT
      const resultado = await saveRut(rut);
      
      // Enviar email
      const emailEnviado = await sendAccessRequestEmail(rut);
      
      if (emailEnviado) {
        try {
          await markEmailAsSent(rut);
        } catch (emailErr) {
          console.warn('Advertencia: No se pudo marcar email como enviado:', emailErr);
        }
      }

      return res.json({
        exito: true,
        mensaje: 'Solicitud de acceso generada. Se envió un correo de confirmación.',
        datos: resultado,
        emailEnviado
      });
    } catch (error: any) {
      console.error('Error al guardar RUT:', error);
      
      // Si es error de duplicado
      if (error.message?.includes('ya existe') || error.message?.includes('UNIQUE')) {
        return res.status(400).json({ 
          error: 'Existe el RUT ingresado',
          existe: true
        });
      } else {
        return res.status(500).json({ error: 'Error al guardar el RUT: ' + error.message });
      }
    }
  });

  // Serve static files from /browser (pero no interfiera con rutas API)
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: false
  }));

  // All regular routes use the Angular engine (fallback para rutas no encontradas)
  // IMPORTANTE: No procesar rutas API con Angular SSR
  server.get('**', (req, res, next) => {
    // Excluir rutas API de la renderización en servidor
    if (req.url.startsWith('/api/')) {
      return next();
    }

    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
