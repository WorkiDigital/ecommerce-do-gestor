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
    *   **Paginação & Escalabilidade**: Marketplace refatorado para Server-Side (Prisma `skip`/`take`). Navegação via URL (`?page=X`) com componente de paginação dedicado.
    *   **Filtros no Banco**: Busca, Nicho e Plataforma agora são processados via Query SQL, não mais no cliente.
    *   **Hero Section**: Animações de borda rítmicas e botão de busca mobile otimizado.
*   **Atenção**: 
    *   Evitar links externos (Imgur/PostImage) devido a instabilidade; priorizar integração futura com **UploadThing**.
    *   **Next.js 15+**: Acessar `params` e `searchParams` sempre de forma assíncrona (`await`).
    *   **Destaques**: A Query do marketplace prioriza gestores com `isFeatured: true` e depois aplica o `orderBy` selecionado.
