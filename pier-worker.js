/**
 * pier-proxy — Cloudflare Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * Faz proxy reverso para pierpublic.azurewebsites.net adicionando os headers
 * de CORS necessários para que o browser aceite as respostas.
 *
 * COMO PUBLICAR (passo a passo):
 *  1. Acesse https://workers.cloudflare.com e crie uma conta gratuita
 *  2. Clique em "Create a Worker"
 *  3. Apague todo o código de exemplo
 *  4. Cole o conteúdo deste arquivo
 *  5. Clique em "Save and Deploy"
 *  6. Copie a URL gerada (ex: pier-proxy.SEU-USUARIO.workers.dev)
 *  7. Cole essa URL no campo "URL da API" do Software 2
 *
 * Plano gratuito Cloudflare Workers:
 *  - 100.000 requisições/dia — mais que suficiente para uso interno
 *  - Sem limite de banda
 *  - Sem necessidade de cartão de crédito
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PIER_BASE = 'https://pierpublic.azurewebsites.net';

// Headers CORS retornados em todas as respostas
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
  'Access-Control-Max-Age':       '86400',
};

export default {
  async fetch(request) {
    // Preflight CORS (browser envia OPTIONS antes de qualquer POST/GET autenticado)
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      // Montar URL de destino: trocar a origem pelo Pier mantendo path + query
      const url      = new URL(request.url);
      const destUrl  = PIER_BASE + url.pathname + url.search;

      // Repassar a requisição original integralmente
      const proxyReq = new Request(destUrl, {
        method:  request.method,
        headers: request.headers,
        body:    ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
        redirect: 'follow',
      });

      const response = await fetch(proxyReq);

      // Copiar a resposta adicionando os headers de CORS
      const newHeaders = new Headers(response.headers);
      Object.entries(CORS_HEADERS).forEach(([k, v]) => newHeaders.set(k, v));

      return new Response(response.body, {
        status:     response.status,
        statusText: response.statusText,
        headers:    newHeaders,
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ erro: 'Falha ao conectar ao Pier', detalhe: err.message }),
        {
          status:  502,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        }
      );
    }
  },
};
