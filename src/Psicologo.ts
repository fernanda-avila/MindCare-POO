import { Pessoa } from "./Pessoa";
import { Usuario } from "./Usuario";
import { Atender } from "./Interfaces";

export class Psicologo extends Pessoa implements Atender{
  private _crp: string;
  private _areaAtuacao: string;

  constructor(
    nomeCompleto: string,
    crp: string,
    areaAtuacao: string,
    genero: string,
    email: string,
    dataNascimento: Date
  ){
    super(nomeCompleto, genero, email, dataNascimento)
    this._crp = crp
    this._areaAtuacao = areaAtuacao
  }

  public get crp(): string{
    return this._crp
  }

  public get areaAtuacao(): string{
    return this._areaAtuacao
  }

  atender(usu: Usuario): string {
    return `Psicólogo ${this.nomeCompleto} (Área: ${this.areaAtuacao}) está atendendo o usuário ${usu.nomeCompleto} (Email: ${usu.email}).`;
  }

}