# Como publicar o Software 2 no GitHub Pages

Depois de seguir este guia, qualquer pessoa da equipe acessa o sistema
em um link fixo, sem instalar nada na máquina.

---

## PASSO 1 — Criar o proxy no Cloudflare Workers (5 minutos)

> O Cloudflare Worker resolve o bloqueio de CORS entre o browser e a API do Pier.
> É gratuito, sem cartão de crédito.

1. Acesse https://workers.cloudflare.com
2. Crie uma conta gratuita (ou entre se já tiver)
3. Clique em **"Create a Worker"**
4. Apague todo o código de exemplo na janela de edição
5. Abra o arquivo **`pier-worker.js`** que está junto com este guia
6. Copie todo o conteúdo e cole na janela do Cloudflare
7. Clique em **"Save and Deploy"**
8. Anote a URL gerada — será algo como:
   ```
   https://pier-proxy.SEU-USUARIO.workers.dev
   ```

---

## PASSO 2 — Ajustar a URL da API no HTML

1. Abra o arquivo **`index.html`** em qualquer editor de texto
2. Localize esta linha (próxima à linha 120):
   ```
   value="https://pier-proxy.SEU-USUARIO.workers.dev"
   ```
3. Substitua pela URL real do seu Worker:
   ```
   value="https://pier-proxy.maycon.workers.dev"
   ```
4. Salve o arquivo

> Alternativamente, o usuário pode editar o campo "URL da API" direto na tela
> do sistema — não precisa mexer no código se preferir.

---

## PASSO 3 — Publicar no GitHub Pages (3 minutos)

1. Acesse https://github.com e crie uma conta (ou entre)
2. Clique em **"New repository"** (botão verde no canto superior direito)
3. Configure:
   - **Repository name:** `pier-dctfweb` (ou qualquer nome)
   - **Visibility:** Public
   - Marque **"Add a README file"**
   - Clique em **"Create repository"**
4. Dentro do repositório, clique em **"Add file" → "Upload files"**
5. Arraste o arquivo `index.html` para a área de upload
6. Clique em **"Commit changes"**
7. Vá em **Settings → Pages** (menu lateral esquerdo)
8. Em **"Source"**, selecione **"Deploy from a branch"**
9. Selecione o branch **"main"** e a pasta **"/ (root)"**
10. Clique em **"Save"**
11. Aguarde ~1 minuto e atualize a página
12. A URL do sistema aparecerá no topo:
    ```
    https://SEU-USUARIO.github.io/pier-dctfweb/
    ```

---

## Resultado final

- **Link do sistema:** `https://SEU-USUARIO.github.io/pier-dctfweb/`
- **Proxy da API:** `https://pier-proxy.SEU-USUARIO.workers.dev`
- Qualquer pessoa com o link acessa direto no browser, sem instalar nada

---

## Atualizando o sistema no futuro

Quando receber uma nova versão do `index.html`:
1. Abra o repositório no GitHub
2. Clique no arquivo `index.html`
3. Clique no ícone de lápis (editar) ou em **"..."→ "Upload new version"**
4. Faça o upload do novo arquivo
5. Clique em **"Commit changes"**
6. Em ~1 minuto o sistema já está atualizado para todos

---

## Limites do plano gratuito

| Serviço | Limite gratuito |
|---|---|
| GitHub Pages | Ilimitado para arquivos estáticos |
| Cloudflare Workers | 100.000 requisições/dia |

100.000 req/dia é mais que suficiente — cada envio de lote completo
consome em torno de 3 a 10 requisições por cliente processado.
