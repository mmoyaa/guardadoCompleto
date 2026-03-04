import sql from 'mssql';

// Configuración de conexión a SQL Server
const sqlConfig = {
  server: 'DESKTOP-NRCSJQH',
  database: 'formularioDB',
  authentication: {
    type: 'default',
    options: {
      userName: 'User',
      password: '' // Dejar vacío si usas autenticación integrada de Windows
    }
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 30000
  }
};

let pool: sql.ConnectionPool;

export async function initializeDatabase(): Promise<void> {
  try {
    pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();
    console.log('✅ Conectado a SQL Server correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a SQL Server:', error);
    throw error;
  }
}

export function getDatabase(): sql.ConnectionPool {
  return pool;
}

export async function searchRut(rut: string): Promise<any> {
  try {
    const request = pool.request();
    const result = await request
      .input('rut', sql.NVarChar, rut)
      .query('SELECT * FROM dbo.rut_solicitudes WHERE rut = @rut');
    
    return result.recordset?.[0] || null;
  } catch (error) {
    console.error('Error buscando RUT:', error);
    throw error;
  }
}

export async function saveRut(rut: string): Promise<any> {
  try {
    const request = pool.request();
    const result = await request
      .input('rut', sql.NVarChar, rut)
      .query(`
        INSERT INTO dbo.rut_solicitudes (rut, email_enviado) 
        VALUES (@rut, 0);
        SELECT SCOPE_IDENTITY() as id;
      `);
    
    const id = result.recordset?.[0]?.id;
    return { id, rut };
  } catch (error: any) {
    console.error('Error guardando RUT:', error);
    // Si el error es por RUT duplicado
    if (error.message?.includes('Violation of UNIQUE KEY')) {
      throw new Error('RUT ya existe');
    }
    throw error;
  }
}

export async function markEmailAsSent(rut: string): Promise<void> {
  try {
    const request = pool.request();
    await request
      .input('rut', sql.NVarChar, rut)
      .query(`
        UPDATE dbo.rut_solicitudes 
        SET email_enviado = 1 
        WHERE rut = @rut
      `);
  } catch (error) {
    console.error('Error actualizando email_enviado:', error);
    throw error;
  }
}

// Función para obtener todos los registros (útil para administración)
export async function getAllRuts(): Promise<any[]> {
  try {
    const request = pool.request();
    const result = await request.query(`
      SELECT id, rut, fecha_solicitud, estado, email_enviado 
      FROM dbo.rut_solicitudes 
      ORDER BY id DESC
    `);
    
    return result.recordset || [];
  } catch (error) {
    console.error('Error obteniendo todos los RUT:', error);
    throw error;
  }
}

