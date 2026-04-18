# TrafegoHub — Contexto de Desenvolvimento

## 🛠 Comandos do Projeto
*   **Dev**: `npm run dev`
*   **Build**: `npm run build`
*   **Lint**: `npm run lint`
*   **Banco de Dados**:
    *   Sincronizar Schema: `npx prisma db push`
    *   Gerar Types: `npx prisma generate`
    *   Executar SQL (VPS): `npx prisma db execute --stdin <<EOF ... EOF`
    *   Visualizar Dados: `npx prisma studio`

## 🎨 Guia de Design (Design System)
*   **Estética**: Premium SaaS Moderno (Acessibilidade WCAG / High Contrast).
*   **Cores**: 
    *   Base: `Slate` (Ardósia 800/900 no Light Mode).
    *   Destaque: Gradiente `Blue-700` para `Indigo-700` (Substituiu o Violeta).
    *   Busca: Borda animada conica (Neon) e efeito Typewriter no placeholder.
*   **Fontes**: `Outfit` (Títulos), `Inter` (Corpo).

## 🚀 Infraestrutura & Deployment
*   **Framework**: Next.js 16.2.3 (Turbopack).
*   **Deploy**: Docker / VPS.
*   **Resiliência**: Fallback de UI implementado na Home (`try/catch` no Prisma) para evitar crash caso o banco na VPS esteja inacessível.

## 📝 Estado Atual & Regras
*   **Melhorias Recentes**:
    *   **Fluxo de Cadastro Simplificado**: Removida a página complexa de 4 passos (`/cadastrar`). O registro agora é feito via `/login` pedindo apenas Nome, E-mail, Telefone e Senha. Implementado **Login Automático** imediatamente após o cadastro bem-sucedido, redirecionando o usuário direto para o Dashboard.
    *   **Dashboard Layout**: Mantida a lógica de banner de "Perfil Incompleto" para incentivar o preenchimento dos dados públicos (Bio, Nichos, etc.) dentro do painel após o primeiro acesso.
    *   **Otimização Mobile do Dashboard**: Implementada navegação por Bottom Tab Bar e Drawer lateral (`MobileNav`). Adicionada barra "Save" fixa (sticky) no rodapé e "Visão de Prévia" via Modal na página de Perfil (`ProfileForm`). Layout do portfólio ajustado com cards responsivos no `PortfolioManager`. Melhor uso do espaço no mobile (`px-4`, espaçamentos compactos).
    *   **Paginação & Escalabilidade**: Marketplace refatorado para Server-Side (Prisma `skip`/`take`). Navegação via URL (`?page=X`) com componente de paginação dedicado.
    *   **Filtros no Banco**: Busca, Nicho e Plataforma agora são processados via Query SQL, não mais no cliente.
    *   **Hero Section**: Animações de borda rítmicas e botão de busca mobile otimizado.
    *   **Layout da Página de Perfil** (`src/app/dashboard/perfil/page.tsx`): usa `max-w-7xl` (não `max-w-5xl`). O `ProfileForm` tem layout 2 colunas (`flex-1` form + `lg:w-[400px]` prévia sticky). Não reduzir esses valores.
*   **Atenção**: 
    *   **UploadThing integrado** (`@uploadthing/react` v7): endpoints `profileImage` (2MB) e `portfolioImage` (4MB) em `src/app/api/uploadthing/core.ts`. Helper tipado em `src/lib/uploadthing.ts`. URL final disponível em `res[0].ufsUrl`.
    *   **Next.js 15+**: Acessar `params` e `searchParams` sempre de forma assíncrona (`await`).
    *   **Destaques**: A Query do marketplace prioriza gestores com `isFeatured: true` e depois aplica o `orderBy` selecionado.

## ⚠️ Regra Crítica — CSS de Terceiros com Tailwind v4

**Problema**: No Tailwind v4, todas as utilities ficam dentro de `@layer utilities`. CSS externo importado **sem layer** (ex: `@import "lib/styles.css"`) fica **fora de qualquer layer** e tem **prioridade maior** que o `@layer utilities` do Tailwind — isso faz `.hidden` de terceiros sobrescrever `md:flex`, quebrando layouts responsivos.

**Solução obrigatória**: Sempre importar CSS de terceiros com a sintaxe `layer()`:
```css
/* globals.css — ORDEM IMPORTA */
@import "terceiro/styles.css" layer(nome-do-layer);  /* ← baixa prioridade */
@import "tailwindcss";                                /* ← utilities ganham */
```
O layer declarado primeiro tem prioridade MENOR. Assim `@layer utilities` do Tailwind sempre vence.

**Caso real resolvido**: `@uploadthing/react/styles.css` definia `.hidden { display: none }` que sobrescrevia `md:flex` do sidebar. Fix: `@import "@uploadthing/react/styles.css" layer(ut-styles)` em `src/app/globals.css`.
