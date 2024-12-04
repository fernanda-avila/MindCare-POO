import { Pessoas } from "./Interfaces"; 

export abstract class Pessoa implements Pessoas {
  protected _nomeCompleto: string;
  protected _genero: string;
  protected _email: string;
  protected _dataNascimento: Date;

  constructor(
    nomeCompleto: string,
    genero: string,
    email: string,
    dataNascimento: Date
  ) {
    this._nomeCompleto = nomeCompleto;
    this._genero = genero;
    this._email = email;
    this._dataNascimento = dataNascimento;
  }

  public get nomeCompleto(): string {
    return this._nomeCompleto;
  }

  public get genero(): string {
    return this._genero;
  }

  public get email(): string {
    return this._email;
  }

  public get dataNascimento(): Date {
    return this._dataNascimento; 
  }

  mostrarPerfil(): string {
    return `Nome completo: ${this._nomeCompleto} \nGênero: ${this._genero} \nEmail: ${this._email} \nData nascimento: ${this._dataNascimento.toLocaleDateString()}`;
  }
}
