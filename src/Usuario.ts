import { Usuarios } from "./Interfaces";
import { Pessoa } from "./Pessoa";
import { Psicologo } from "./Psicologo";
import { Colaborador } from "./Colaborador";
import { Plano } from "./Plano";

export class Usuario extends Pessoa implements Usuarios {
  private senha: string;
  consultar: (psi: Psicologo) => string;
  private motivoUrgente: string | null;
  plano: Plano | null;
  consultasMarcadas: { psicologo: Psicologo; data: string; hora: string }[] = [];

  constructor(
    nomeCompleto: string,
    genero: string,
    email: string,
    dataNascimento: Date,
    senha: string,
    consultar: (psi: Psicologo) => string,
    consultasMarcadas: { psicologo: Psicologo; data: string; hora: string }[] = []
  ) {
    super(nomeCompleto, genero, email, dataNascimento);
    this.senha = senha;
    this.motivoUrgente = null;
    this.plano = null;
    this.consultar = consultar;
    this.consultasMarcadas = consultasMarcadas;
  }

  // Getter e Setter para senha
  get getSenha(): string {
    return this.senha;
  }

  set setSenha(novaSenha: string) {
    if (novaSenha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    this.senha = novaSenha;
    console.log("Senha alterada com sucesso.");
  }

  // Método para exibir o motivo de urgência
  public getMotivoUrgente(): string | null {
    return this.motivoUrgente;
  }

  // Método para obter a função de consulta
  public getConsultar(): (psi: Psicologo) => string {
    return this.consultar;
  }

  public getConsultasMarcadas(): { psicologo: Psicologo; data: string; hora: string }[] {
    return this.consultasMarcadas;
  }

  // Método para mostrar o perfil do usuário
public mostrarPerfil(): string {
  let perfil = "\nPerfil do Usuário:\n";
  perfil += `Nome completo: ${this.nomeCompleto}\n`;
  perfil += `Gênero: ${this.genero}\n`;
  perfil += `Email: ${this.email}\n`;
  perfil += `Data de nascimento: ${this.dataNascimento.toDateString()}\n`;
  if (this.plano) {
      perfil += `Plano: ${this.plano.nome}\n`;
  } else {
      perfil += "Plano: Nenhum\n";
  }
  return perfil;
}

  

  // Marcar uma consulta com data e hora
  marcarConsulta(psi: Psicologo, data: string, hora: string): string {
    this.consultasMarcadas.push({ psicologo: psi, data, hora });
    return `Consulta com o psicólogo ${psi.nomeCompleto} agendada para ${data} às ${hora}.`;
  }

  // Solicitar conversa urgente com colaborador
  solicitarConversaUrgente(col: Colaborador, motivo: string): string {
    if (!col.getTurnoDisponivel()) {
      return `O colaborador ${col.nomeCompleto} não tem turno disponível para conversa urgente.`;
    }

    this.motivoUrgente = motivo;
    return `Conversa urgente solicitada com o colaborador ${col.nomeCompleto}. Motivo: ${motivo}. Turno disponível: ${col.getTurnoDisponivel()}.`;
  }

  // Confirmar adesão ao plano
  confirmarAdesaoPlano(plano: Plano, confirmacao: boolean): string {
    if (confirmacao) {
      this.plano = plano;
      return `Plano contratado com sucesso!\nNome do plano: ${plano.nome}\nDescrição: ${plano.descricao}\nPreço: R$${plano.preco.toFixed(2)}\nDuração: ${plano.duracaoMeses} meses.`;
    } else {
      return "Compra cancelada.";
    }
  }
}
