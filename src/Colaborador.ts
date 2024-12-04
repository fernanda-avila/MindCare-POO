import { Atender, Usuarios } from "./Interfaces";
import { Pessoa } from "./Pessoa";
import { Usuario } from "./Usuario";

export class Colaborador extends Pessoa implements Atender{
  private _turnoDisponivel: string;

  constructor(
    nomeCompleto: string,
    turnoDisponivel: string,
    genero: string,
    email: string,
    dataNascimento: Date
  ){
    super(nomeCompleto, genero, email, dataNascimento)
    this._turnoDisponivel = turnoDisponivel
  }
  
  public getTurnoDisponivel(): string{
    return this._turnoDisponivel
  }
  public setTurnoDisponivel(novoTurno: string): string{
    this._turnoDisponivel = novoTurno;
    return `Novo turno definido com sucesso!`
  }

  atender(usu: Usuario): string {
    return `Colaborador ${this.nomeCompleto} (Turno: ${this._turnoDisponivel}) está atendendo o usuário ${usu.nomeCompleto} (Email: ${usu.email}).`;
  }

}