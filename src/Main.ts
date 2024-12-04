// Importações das classes necessárias
import promptSync from 'prompt-sync';
import { Colaborador } from "./Colaborador";
import { Plano } from "./Plano";
import { Usuario } from "./Usuario";
import { Psicologo } from "./Psicologo";

const prompt = promptSync({ sigint: true });


// Classe MindCare
export class MindCare {
    Colaboradores: Colaborador[] = [];
    Planos: Plano[] = [];
    Usuarios: Usuario[] = [];
    Psicologos: Psicologo[] = [];

    // Adicionar Psicólogo
    adicionarPsicologo(psicologo: Psicologo): void {
        this.Psicologos.push(psicologo);
        console.log(`Psicólogo(a) ${psicologo.nomeCompleto} adicionado(a) com sucesso!`);
    }

    // Adicionar Plano
    adicionarPlano(plano: Plano): void {
        this.Planos.push(plano);
        console.log(`Plano ${plano.nome} adicionado com sucesso!`);
    }

    // Adicionar Usuário
    adicionarUsuario(usuario: Usuario): void {
        this.Usuarios.push(usuario);
    }


    // Menu inicial
    public exibirMenuInicial(): void {
        let opcao = '';
        while (opcao !== '5') {
            console.log("\nBem-vindo ao MindCare!");
            console.log("1. Criar Conta");
            console.log("2. Login");
            console.log("3. Conversa Urgente com Colaborador");
            console.log("4. Sair");

            opcao = prompt("Escolha uma opção: ");

            switch (opcao) {
                case '1':
                    this.criarConta();
                    break;
                case '2':
                    const usuario = this.login();
                    if (usuario) {
                        this.exibirMenu(usuario);
                    }
                    break;
                case '3':
                    this.solicitarConversaUrgente();
                    break;
                case '4':
                    console.log("Saindo...");
                    return;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }

    // Função para criar uma nova conta
    public criarConta(): void {
        console.log("\nCriação de Conta");
        const nomeCompleto = prompt("Digite seu nome completo: ");
        const email = prompt("Digite seu email: ");
        const senha = prompt("Digite sua senha: ", { echo: '*' });
        const dataNascimento = prompt("Digite sua data de nascimento (YYYY-MM-DD): ");

        const novoUsuario = new Usuario(nomeCompleto, "Não informado", email, new Date(dataNascimento), senha, () => "");
        this.adicionarUsuario(novoUsuario);

        console.log(`Conta criada com sucesso! Bem-vindo(a), ${nomeCompleto}!`);
    }

    // Função de login com senha e tentativas repetidas
    public login(): Usuario | null {
        console.log("\nLogin");

        let usuario: Usuario | undefined;
        let tentativas = 0;
        const maxTentativas = 3;

        while (!usuario && tentativas < maxTentativas) {
            const email = prompt("Digite seu email: ");
            const senha = prompt("Digite sua senha: ", { echo: '*' });
            usuario = this.Usuarios.find(u => u.email === email && u.getSenha === senha);

            if (usuario) {
                console.log(`Login realizado com sucesso! Bem-vindo(a), ${usuario.nomeCompleto}!`);
                return usuario;
            } else {
                tentativas++;
                console.log(`Email ou senha incorretos. Tentativas restantes: ${maxTentativas - tentativas}`);
            }
        }

        if (tentativas >= maxTentativas) {
            console.log("Número máximo de tentativas atingido. Saindo...");
        }
        return null;
    }

    // Exibir o menu principal após o login
    public exibirMenu(usuario: Usuario) {
        let opcao = '';
        while (opcao !== '6') {
            console.log("\nMenu:");
            console.log("1. Ver Planos");
            console.log("2. Marcar Consulta");
            console.log("3. Ver Psicólogos");
            console.log("4. Ver Meu Perfil");
            console.log("5. Ver Minhas Consultas");
            console.log("6. Sair");

            opcao = prompt("Escolha uma opção: ");

            switch (opcao) {
                case '1':
                    this.verPlanos(usuario);
                    break;
                case '2':
                    this.marcarConsulta(usuario);
                    break;
                case '3':
                    this.verPsicologos();
                    break;
                case '4':
                    console.log(usuario.mostrarPerfil());
                    break;
                case '5':
                    this.verConsultas(usuario);
                    break;
                case '6':
                    console.log("Saindo...");
                    return;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }

    // Mostra os planos disponíveis 
    public verPlanos(usuario: Usuario) {
        console.log("\nPlanos disponíveis:");
        this.Planos.forEach((plano, index) => {
            console.log(`${index + 1}. ${plano.nome}: ${plano.descricao} - R$${plano.preco}`);
        });

        const opcao = prompt("Escolha o plano pelo número: ");
        const escolhaIndex = parseInt(opcao);

        if (!isNaN(escolhaIndex) && escolhaIndex > 0 && escolhaIndex <= this.Planos.length) {
            const planoEscolhido = this.Planos[escolhaIndex - 1];

            // Confirmação de compra
            const confirmar = prompt(`Você escolheu o plano ${planoEscolhido.nome}. Deseja confirmar a compra? (s/n): `).toLowerCase();
            if (confirmar === 's') {
                usuario.plano = planoEscolhido;
                console.log(`Compra confirmada! Você aderiu ao plano: ${planoEscolhido.nome}.`);
            } else {
                console.log("Compra cancelada.");
            }
        } else {
            console.log("Opção inválida.");
        }
    }

    // Marcar uma consulta
    public marcarConsulta(usuario: Usuario) {
        console.log("\nPsicólogos disponíveis:");
        this.Psicologos.forEach((psicologo, index) => {
            console.log(`${index + 1}. ${psicologo.nomeCompleto} - Especialidade: ${psicologo.areaAtuacao}`);
        });

        const opcao = prompt("Escolha um psicólogo pelo número: ");
        const escolhaIndex = parseInt(opcao);

        if (!isNaN(escolhaIndex) && escolhaIndex > 0 && escolhaIndex <= this.Psicologos.length) {
            const psicologo = this.Psicologos[escolhaIndex - 1];

            // Marcação de data e hora
            const dataConsulta = prompt("Escolha a data da consulta (YYYY-MM-DD): ");
            const horaConsulta = prompt("Escolha a hora da consulta (HH:MM): ");
            console.log(`Consulta marcada com ${psicologo.nomeCompleto} em ${dataConsulta} às ${horaConsulta} para ${usuario.nomeCompleto}!`);

            usuario.consultasMarcadas.push({ psicologo, data: dataConsulta, hora: horaConsulta });
        } else {
            console.log("Opção inválida.");
        }
    }

    // Mostrar psicólogos
    public verPsicologos() {
        console.log("\nPsicólogos disponíveis:");
        this.Psicologos.forEach(psicologo => {
            console.log(`${psicologo.nomeCompleto} - Especialidade: ${psicologo.areaAtuacao}`);
        });
    }

    // Conversa urgente com colaborador
    public solicitarConversaUrgente(): void {
        console.log("\nEstamos lhe encaminhando para um de nossos colaboradores, aguarde só um pouquinho...");

        // Escolha de colaborador
        const colaboradorEscolhido = this.Colaboradores[0];
        console.log(`Conversa urgente solicitada com ${colaboradorEscolhido.nomeCompleto}.`);

        let opcao = '';
        while (opcao !== '2') {
            console.log("\n1. Voltar para o Menu Principal");
            console.log("2. Sair");

            opcao = prompt("Escolha uma opção: ");
            switch (opcao) {
                case '1':
                    console.log("Voltando para o Menu Principal...");
                    this.exibirMenuInicial();
                    break;
                case '2':
                    console.log("Saindo...");
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
    }

    // Ver consultas agendadas
    public verConsultas(usuario: Usuario) {
        if (usuario.consultasMarcadas.length === 0) {
            console.log("\nVocê não tem consultas agendadas.");
        } else {
            console.log("\nMinhas Consultas:");
            usuario.consultasMarcadas.forEach(consulta => {
                console.log(`Psicólogo: ${consulta.psicologo.nomeCompleto} | Data: ${consulta.data} | Hora: ${consulta.hora}`);
            });
        }
    }
}

// Função para inicializar o programa
function iniciar() {

    const sistema = new MindCare();

    const usuario2 = new Usuario(
        'Fernanda Avila',
        'Feminino',
        'fernanda@example.com',
        new Date('1990-05-25'),
        'senha123',
        (psi: Psicologo) => `Consultando ${psi.nomeCompleto}`
    );

    sistema.adicionarUsuario(usuario2);

    // Inserção de objetos em Usuários, Planos, Psicólogos e Colaboradores

    const plano1 = new Plano("Plano Básico",
        "Acesso limitado a consultas e recursos",
        49.99, 3);
    const plano2 = new Plano("Plano Premium",
        "Acesso completo a todas as funcionalidades",
        99.99,
        6);
    sistema.adicionarPlano(plano1);
    sistema.adicionarPlano(plano2);


    const psicologo1 = new Psicologo(
        "Dr. João Silva",
        "CRP 12345/SP",
        "Psicologia Clínica",
        "Masculino",
        "joao.silva@email.com",
        new Date("1985-03-15")
    );

    const psicologo2 = new Psicologo(
        "Dra. Maria Souza",
        "CRP 67890/SP",
        "Psicologia Infantil",
        "Feminino",
        "maria.souza@email.com",
        new Date("1990-07-22")
    );
    sistema.adicionarPsicologo(psicologo1);
    sistema.adicionarPsicologo(psicologo2);


    const colaborador1 = new Colaborador(
        "Carlos Pereira",
        "Manhã",
        "Masculino",
        "carlos.pereira@email.com",
        new Date("1980-05-12")
    );

    const colaborador2 = new Colaborador(
        "Ana Oliveira",
        "Tarde",
        "Feminino",
        "ana.oliveira@email.com",
        new Date("1992-08-20")
    );

    sistema.Colaboradores.push(colaborador1, colaborador2);

    // Inicia o sistema
    sistema.exibirMenuInicial();
}

// Inicia o programa
iniciar();
