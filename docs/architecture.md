# Arquitetura e manutenção

## Composição da aplicação

`main.tsx` inicializa o React, carrega o CSS e cria o `BrowserRouter`. `App.tsx` compõe `NotificationProvider`, `ControlProvider` e `AppRoutes`.

`AppRoutes.tsx` é o ponto único de definição das rotas. Os caminhos são definidos em `routes/paths.ts`, compartilhado com o menu em `config/navigation.ts`. As páginas operacionais são filhas de `AppLayout` e aparecem em seu `Outlet`. Os fluxos de acesso usam páginas independentes, com o componente visual `AuthScreen`.

Nenhuma rota tem proteção de acesso. A existência das páginas de login e permissões não representa uma implementação de segurança.

## Responsabilidades

| Camada                          | Responsabilidade                                            | Evitar                                                          |
| ------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------- |
| `pages`                         | Compor a tela, manter filtros e ações específicas           | Reimplementar tabela, diálogo ou acesso direto ao armazenamento |
| `components/ui`                 | Elementos visuais reutilizáveis                             | Dependência de regras de funcionários ou equipamentos           |
| `components/forms`              | Campos e formulários compartilhados                         | Definir rotas                                                   |
| `components/records`            | Edição, histórico, exclusão e ações das entidades           | Duplicar persistência por página                                |
| `layouts` e `components/layout` | Estrutura da aplicação e navegação                          | Consultas e validação de registros                              |
| `contexts`                      | Dados globais e coordenação de feedback/diálogos            | Filtros temporários de uma página                               |
| `hooks`                         | Comportamento reutilizável ligado ao React                  | Marcação de páginas completas                                   |
| `services`                      | Acesso ao armazenamento, validação e transformação de dados | JSX e navegação                                                 |
| `utils`                         | Funções independentes da interface                          | Estado React                                                    |
| `types`                         | Contratos TypeScript compartilhados                         | Valores de configuração secretos                                |

## Fluxo de cadastro e edição

1. `CreateButton` ou `RowActions` solicita a abertura ao `RecordDialogProvider`.
2. `RecordDialog` compõe o `Modal` e os campos de `RecordFields`.
3. O envio coleta `FormData` e chama `parseRecord`, que valida os campos e retorna uma união discriminada pela entidade.
4. O diálogo atualiza a coleção tipada no `ControlProvider` com `upsertRecord`.
5. `useLocalStorage` persiste a alteração em um efeito e as páginas que usam o contexto são atualizadas.
6. `NotificationProvider` apresenta o feedback. Em caso de falha de persistência, a alteração permanece em memória e o usuário é avisado.

Permissões são lidas com `FormData.getAll`, inclusive quando o formulário é enviado pelo teclado. Os diálogos centralizam Escape, foco inicial, contenção de Tab e retorno do foco ao elemento anterior.

## Estado e compatibilidade

Os contratos de funcionário, equipamento, empréstimo, papel e usuário estão em `types/models.ts`. `Row` representa os campos textuais genéricos usados nos formulários e no CSV; os estados compartilhados usam entidades específicas.

`services/storage.ts` centraliza as chaves `ep-employees`, `ep-equipment`, `ep-usage`, `ep-roles`, `ep-users`, `ep-attendance` e `ep-operation`. Não renomeie essas chaves sem uma migração. Leituras tratam JSON inválido ou armazenamento indisponível; dados lidos ainda não têm validação completa de esquema em runtime.

Filtros pertencem à página. `useDateRange` inicia com a data local e limita as colunas da presença a 62 dias. A presença usa a chave `employeeId|YYYY-MM-DD`. As notificações têm temporizador centralizado, cancelado ao substituir a mensagem ou desmontar o provider.

## Estilos

`styles/index.css` controla a ordem da cascata:

1. `base.css`: tokens, fontes, reset, elementos HTML e botões.
2. `layout.css`: sidebar, cabeçalho, área principal e rodapé.
3. `pages.css`: padrões de tabelas, indicadores, filtros e páginas.
4. `feedback.css`: toast, diálogos e formulários de registro.
5. `auth.css`: fluxos de acesso.
6. `responsive.css`: media queries e impressão.

Os comentários descrevem decisões e contratos. Prettier e EditorConfig mantêm indentação, quebras de linha e estilo consistentes. TypeScript verifica também imports e variáveis não usados.

## Adicionar uma página

1. Crie o componente em `pages/`, mantendo filtros e estado temporário na própria página.
2. Adicione o caminho em `routes/paths.ts`.
3. Registre o componente em `routes/AppRoutes.tsx`, como filho de `AppLayout` quando usar o menu.
4. Se a tela deve aparecer no menu, inclua a entrada em `config/navigation.ts`.
5. Reutilize `PageHeader`, `DataTable`, `Badge` e os demais componentes existentes.
6. Atualize a tabela de rotas no README e inclua um cenário no teste de rotas.

## Evoluir para uma API

`config/env.ts` já concentra o endereço público reservado para a API, mas não existe cliente HTTP ativo. Na integração, crie serviços por domínio em `services/` e substitua a persistência local no contexto, preservando os contratos usados nas páginas quando possível.

A API deverá tratar autenticação, autorização, validação de payloads e vínculos por identificador. Atualmente os empréstimos preservam referências textuais a funcionário e equipamento; esse modelo deve ser migrado antes de implementar relações persistidas no servidor. Proteções de rota no frontend são apenas parte da experiência e não substituem validação de acesso na API.

## Verificação

Execute `npm run typecheck`, `npm test`, `npm run format:check` e `npm run build` antes de integrar mudanças. Os testes cobrem todas as rotas por renderização de componentes e regras independentes de formulário, armazenamento, CSV e datas. Eles não simulam cliques nem substituem revisão visual e testes de interação no navegador.
