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
    *   Hero Section modernizada com animações de borda rítmicas.
    *   Barra de busca mobile otimizada (Botão de largura total com alto contraste).
    *   Sistema de "Destaques" ativo (Filtra por `isFeatured: true`).
*   **Atenção**: Evitar links externos (Imgur/PostImage) devido a instabilidade; priorizar integração futura com **UploadThing**.
*   **Next.js 15+**: Acessar `params` sempre de forma assíncrona (`await params`) para evitar erros de renderização.
