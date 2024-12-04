import { Usuario } from "./Usuario";
import { Psicologo } from "./Psicologo";
import { Colaborador } from "./Colaborador";
import { Plano } from "./Plano";

export interface Pessoas {
  nomeCompleto: string;
  genero: string;
  email: string;
  dataNascimento: Date;
  mostrarPerfil(): void;
}

export interface Usuarios {
  consultar(psi: Psicologo): string
  solicitarConversaUrgente(col: Colaborador, motivo: string): string,
  
}

export interface Atender {
  atender(usu: Usuario): string
}

export interface Planos{
  nome: string;
  descricao: string;
  preco: number;
  duracaoMeses: number;
  mostrarDetalhes(): string
}