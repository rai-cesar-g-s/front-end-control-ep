# Variáveis de ambiente

## Arquivos

| Arquivo                                | Uso                             | Vai para o GitHub?       |
| -------------------------------------- | ------------------------------- | ------------------------ |
| `.env.example`                         | Modelo público, sem credenciais | Sim                      |
| `.env`                                 | Valores locais do projeto       | Não                      |
| `.env.local`                           | Sobrescritas desta máquina      | Não                      |
| `.env.development` / `.env.production` | Valores opcionais por modo      | Não, pelas regras atuais |
| `.env.[modo].local`                    | Sobrescritas locais por modo    | Não                      |

O projeto já inclui `.env` e `.env.local`. Para novos clones, copie o modelo. Os arquivos por modo são opcionais e não foram criados porque os ambientes de implantação ainda não foram definidos.

Arquivos específicos do modo têm prioridade sobre os genéricos; variantes `.local` sobrescrevem as correspondentes. Variáveis já definidas no processo que inicia o Vite têm prioridade. O servidor precisa ser reiniciado para carregar alterações.

## Variáveis disponíveis

| Nome                | Exemplo                 | Aplicação                                          |
| ------------------- | ----------------------- | -------------------------------------------------- |
| `VITE_APP_NAME`     | `Control EP`            | Título da aba e nome no rodapé                     |
| `VITE_API_BASE_URL` | `http://localhost:3000` | Reservada para a futura API; ainda sem requisições |

O acesso a essas variáveis fica em `src/config/env.ts`, com declaração de tipos em `src/vite-env.d.ts`. Para adicionar uma configuração pública, atualize esses dois arquivos e `.env.example`.

## O que realmente fica secreto

`.gitignore` impede que arquivos locais **não rastreados** sejam adicionados normalmente ao Git. Isso não criptografa os arquivos, não remove arquivos já rastreados e não oculta valores inseridos no bundle.

O Vite substitui variáveis `VITE_*` durante a compilação. Seus valores são entregues ao navegador e podem ser inspecionados mesmo que o `.env` nunca tenha sido enviado ao GitHub. Use esse prefixo apenas para configurações públicas, como a URL de uma API.

Credenciais de banco de dados, chaves privadas de serviços, segredos de assinatura e segredos OAuth pertencem ao ambiente do **backend**. Não os adicione com prefixo `VITE_` e não os inclua em componentes, arquivos TypeScript ou dados demonstrativos. Este repositório ainda não contém backend nem mecanismo de custódia de segredos.

Os scripts de formatação ignoram arquivos `.env` para não os reescrever. O único modelo destinado ao versionamento é `.env.example`, que deve conter nomes de variáveis e exemplos públicos.

## Conferência antes de publicar

Em um repositório Git inicializado, estes comandos permitem conferir as regras sem imprimir os valores dos arquivos:

```sh
git check-ignore -v .env .env.local
git ls-files -- .env ".env.*"
```

No segundo comando, apenas `.env.example` deve aparecer entre os arquivos versionados. Se uma credencial real já tiver sido publicada, ignorar o arquivo não resolve a exposição: a credencial precisa ser revogada/substituída no serviço correspondente, além da correção no repositório.

## Implantação

Configure as variáveis públicas no ambiente de build da hospedagem e execute `npm run build`. Alterar uma variável após o build não modifica o JavaScript já gerado; é necessário gerar e publicar um novo build.

Não copie os arquivos `.env` para a pasta pública `dist/`. A publicação deve conter apenas os artefatos gerados pelo Vite.
