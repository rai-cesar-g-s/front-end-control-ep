# Control EP

Frontend para gestão de presença e equipamentos em **React, Vite e TypeScript**, organizado por responsabilidade. O visual da primeira versão foi mantido.

## Iniciar o projeto

Requer Node.js **22.18 ou superior** e npm. A versão mínima também permite executar os testes TypeScript com o runner nativo do Node.

```sh
npm ci
```

Em uma nova máquina, copie `.env.example` para `.env`. No PowerShell:

```powershell
Copy-Item .env.example .env
```

```sh
npm run dev
```

Abra o endereço exibido pelo Vite no terminal. Após alterar variáveis de ambiente, reinicie o servidor.

## Comandos

| Comando                | Finalidade                                                                     |
| ---------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento com atualização automática                         |
| `npm run build`        | Verificação TypeScript e geração da versão de produção em `dist/`              |
| `npm run preview`      | Visualizar o build de produção localmente                                      |
| `npm run typecheck`    | Verificar os tipos sem gerar arquivos                                          |
| `npm test`             | Testar regras de registros, datas, CSV, armazenamento e renderização das rotas |
| `npm run format`       | Formatar o projeto com Prettier                                                |
| `npm run format:check` | Conferir a formatação sem modificar arquivos                                   |

## Organização

```text
src/
├── components/
│   ├── auth/         # Interface compartilhada dos fluxos de acesso
│   ├── forms/        # Campos, filtros de data e formulário de operação
│   ├── layout/       # Sidebar, cabeçalho e rodapé
│   ├── records/      # Ações, campos, histórico e diálogos de registros
│   └── ui/           # Tabela, badge, modal, toast e estado vazio
├── config/           # Configurações públicas de ambiente e menu
├── contexts/         # Dados compartilhados, notificações e diálogos
├── data/             # Dados iniciais da demonstração
├── hooks/            # Persistência local e intervalo de datas
├── layouts/          # Estrutura visual comum às páginas operacionais
├── pages/            # Uma página por rota; filtros locais de cada tela
│   └── auth/         # Login, cadastro e recuperação de senha
├── routes/           # Catálogo de URLs e definição central das rotas
├── services/         # Armazenamento e conversão/validação de registros
├── styles/           # CSS separado por responsabilidade
├── types/            # Contratos TypeScript das entidades
├── utils/            # Funções de datas e exportação CSV
├── App.tsx           # Composição dos providers e rotas
└── main.tsx          # Inicialização do React e do BrowserRouter
docs/
├── architecture.md   # Responsabilidades e orientação de manutenção
└── environment.md    # Variáveis de ambiente e limites de segurança
tests/                # Testes executados pelo Node e smoke tests com Vite
```

Veja [a documentação da arquitetura](docs/architecture.md) para entender o fluxo dos dados e adicionar novas páginas.

## Rotas

| URL                 | Página              | Funções                                        |
| ------------------- | ------------------- | ---------------------------------------------- |
| `/`                 | Painel              | Indicadores por período, equipe e equipamentos |
| `/presenca`         | Presença            | Registro diário, filtros, impressão e CSV      |
| `/uso-equipamentos` | Uso de equipamentos | Empréstimos, devoluções, filtros e CSV         |
| `/funcionarios`     | Funcionários        | Cadastro, edição, busca e exclusão             |
| `/equipamentos`     | Equipamentos        | Inventário, edição, exclusão, histórico e CSV  |
| `/aprovacoes`       | Aprovações          | Aprovar ou recusar solicitações                |
| `/gestao`           | Gestão              | Papéis, permissões e configuração da operação  |
| `/usuarios`         | Usuários            | Listagem e atribuição de papéis                |
| `/login`            | Login               | Interface demonstrativa de entrada             |
| `/cadastro`         | Cadastro            | Interface demonstrativa de cadastro            |
| `/recuperar-senha`  | Recuperação         | Interface de solicitação de redefinição        |
| `/redefinir-senha`  | Redefinição         | Estado de link ausente ou inválido             |
| Qualquer outra URL  | Não encontrada      | Retorno ao painel                              |

As rotas são públicas. Login, Google e recuperação de senha não realizam autenticação nem envio de e-mail nesta etapa.

## Ambiente e GitHub

- `.env`: configuração local, ignorada pelo Git.
- `.env.local`: sobrescritas opcionais por máquina, também ignoradas.
- `.env.example`: modelo sem segredos, destinado ao repositório.

**Ignorar um arquivo no Git não torna seus valores secretos no navegador.** Tudo que usa o prefixo `VITE_` pode aparecer no JavaScript de produção. Senhas de banco, chaves privadas, segredos OAuth e tokens de serviços devem ficar no **backend**, que ainda não faz parte deste projeto.

As configurações públicas ficam centralizadas em `src/config/env.ts`. `VITE_APP_NAME` define o título da aba e o nome do rodapé. `VITE_API_BASE_URL` está reservada para a integração futura e ainda não dispara requisições.

Leia [a documentação de ambiente](docs/environment.md) antes de adicionar novas variáveis.

## Persistência e escopo atual

Os dados são salvos no `localStorage` do navegador, usando as mesmas chaves da primeira versão para preservar os registros já existentes. Os exemplos só são usados quando a coleção não existe. Filtros são estados locais de cada página. Limpe os dados do site no navegador para restaurar os exemplos.

O armazenamento é demonstrativo, sem sincronização entre dispositivos, autorização ou API. Os empréstimos ainda referenciam nomes/identificações textuais; a integração com o backend deverá adotar relacionamentos por ID e validar permissões no servidor. Os testes de rotas verificam renderização e composição dos componentes, não a aparência em navegador.

## Publicação

Execute `npm run build` e publique a pasta `dist/`. Configure no servidor o fallback de rotas para `index.html`, necessário para abrir ou atualizar URLs como `/funcionarios` diretamente. `npm run preview` serve para validação local do build.

O layout usa Google Fonts com fallback para fontes sans-serif locais.
