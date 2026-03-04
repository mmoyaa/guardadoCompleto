declare module 'mssql' {
  export interface ConnectionPool {
    connect(): Promise<void>;
    request(): Request;
  }

  export interface Request {
    input(name: string, type: any, value: any): Request;
    query(sql: string): Promise<{ recordset: any[] }>;
  }

  export class ConnectionPool {
    constructor(config: any);
    connect(): Promise<void>;
    request(): Request;
  }

  export const NVarChar: any;
  export const Int: any;
  export const Bit: any;
}

declare module 'nodemailer' {
  export interface TransportOptions {
    service?: string;
    auth?: {
      user?: string;
      pass?: string;
    };
  }

  export interface MailOptions {
    from?: string;
    to?: string;
    subject?: string;
    text?: string;
    html?: string;
  }

  export interface SendMailResponse {
    response?: string;
  }

  export interface Transporter {
    sendMail(mailOptions: MailOptions): Promise<SendMailResponse>;
  }

  export function createTransport(options: TransportOptions): Transporter;
}


