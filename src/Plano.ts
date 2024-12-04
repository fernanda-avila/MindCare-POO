import { Planos } from "./Interfaces";

export class Plano implements Planos{
  private _nome: string;
  private _descricao: string;
  private _preco: number;
  private _duracaoMeses: number;

  constructor(
    nome: string,
    descricao: string,
    preco: number,
    duracaoMeses: number
  ){
    this._nome = nome
    this._descricao = descricao
    this._preco = preco
    this._duracaoMeses = duracaoMeses
  }
  
  public get nome():string{
    return this._nome
  }

  public get descricao():string{
    return this._descricao
  }

  public get preco():number{
    return this._preco
  }

  public get duracaoMeses():number{
    return this._duracaoMeses
  }

  mostrarDetalhes(): string {
    return `Nome: ${this.nome} \nDescrição: ${this.descricao} \nPreço: ${this._preco} \nDuração em meses: ${this._duracaoMeses}`
  }
}