import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

let server;
let App;
let MemoryRouter;

// Smoke test de composição: renderiza rotas, contextos e páginas reais sem precisar de backend.
// Não substitui a verificação visual em navegador.
before(async () => {
  globalThis.window = { innerWidth: 1280 };
  server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
    ssr: {
      noExternal: ['react-router-dom', 'react-router'],
      resolve: { conditions: ['module', 'module-sync', 'node', 'development'] },
    },
  });
  MemoryRouter = (await server.ssrLoadModule('react-router-dom')).MemoryRouter;
  App = (await server.ssrLoadModule('/src/App.tsx')).default;
});
after(async () => {
  await server?.close();
  delete globalThis.window;
});

const routes = [
  ['/', 'Painel Geral'],
  ['/funcionarios', 'Funcionários'],
  ['/equipamentos', 'Equipamentos'],
  ['/presenca', 'Lista de Presença'],
  ['/uso-equipamentos', 'Uso de Equipamentos'],
  ['/usuarios', 'Usuários'],
  ['/aprovacoes', 'Aprovações'],
  ['/gestao', 'Gestão'],
  ['/login', 'Bem-vindo de volta'],
  ['/cadastro', 'Crie sua conta'],
  ['/recuperar-senha', 'Recuperar senha'],
  ['/redefinir-senha', 'Link de recuperação inválido'],
  ['/pagina-inexistente', 'Página não encontrada'],
];
for (const [path, title] of routes) {
  test(`rota ${path} renderiza a página esperada`, () => {
    const html = renderToString(
      React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(App)),
    );
    assert.ok(html.includes(`<h1>${title}</h1>`));
    if (path === '/login') assert.ok(!html.includes('class="sidebar"'));
    if (path === '/') assert.ok(html.includes('class="sidebar"'));
  });
}
