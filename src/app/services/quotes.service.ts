import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

export interface Quote {
  id: number;
  text: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class QuotesService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private plataforma = '';

  private readonly DB_NAME = 'quotes_db';
  private readonly DB_VERSION = 1;
  private readonly DB_ENCRIPTADA = false;
  private readonly DB_MODE = 'no-encryption';
  private readonly DB_READ_ONLY = false;
  private readonly DB_TABLE_NAME = 'quotes';
  private readonly DB_SQL_TABLAS = `CREATE TABLE IF NOT EXISTS ${this.DB_TABLE_NAME}(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, author TEXT NOT NULL);`;

  private initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.iniciarPlugin();
  }

  private async persist(): Promise<void> {
    if (this.plataforma === 'web') {
      await this.sqlite.saveToStore(this.DB_NAME);
    }
  }

  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  private async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
    }
    await this.db.open();
  }

  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform();
    if (this.plataforma === 'web') {
      await this._iniciarPluginWeb();
    }
    await this.abrirConexion();
    await this.db.execute(this.DB_SQL_TABLAS);

    const res = await this.db.query(`SELECT COUNT(*) as count FROM ${this.DB_TABLE_NAME}`);
    const count = res.values ? res.values[0].count : 0;
    if (count === 0) {
      await this.db.run(`INSERT INTO ${this.DB_TABLE_NAME}(text, author) VALUES (?, ?)`, [
        'La vida es lo que pasa mientras estás ocupado haciendo otros planes.',
        'John Lennon',
      ]);
      await this.persist();
      await this.db.run(`INSERT INTO ${this.DB_TABLE_NAME}(text, author) VALUES (?, ?)`, [
        'El conocimiento es poder.',
        'Francis Bacon',
      ]);
      await this.persist();
      await this.db.run(`INSERT INTO ${this.DB_TABLE_NAME}(text, author) VALUES (?, ?)`, [
        'Solo sé que no sé nada.',
        'Sócrates',
      ]);
      await this.persist();
    }
  }

  private async ready() {
    await this.initPromise;
  }

  async getQuotes(): Promise<Quote[]> {
    await this.ready();
    const sql = `SELECT * FROM ${this.DB_TABLE_NAME}`;
    const resultado = await this.db.query(sql);
    return (resultado.values as Quote[]) ?? [];
  }

  async getRandomQuote(): Promise<Quote> {
    const quotes = await this.getQuotes();
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  async addQuote(text: string, author: string): Promise<void> {
    await this.ready();
    const sql = `INSERT INTO ${this.DB_TABLE_NAME}(text, author) VALUES(?, ?)`;
    await this.db.run(sql, [text, author]);
    await this.persist();
  }

  async deleteQuote(id: number): Promise<void> {
    await this.ready();
    await this.db.run(`DELETE FROM ${this.DB_TABLE_NAME} WHERE id = ?`, [id]);
    await this.persist();
  }

  async close(): Promise<void> {
    await this.ready();
    await this.sqlite.closeConnection(this.DB_NAME, this.DB_READ_ONLY);
  }
}
