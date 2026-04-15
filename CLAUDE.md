# TrafegoHub — Contexto de Desenvolvimento

## 🛠 Comandos do Projeto
*   **Dev**: `npm run dev`
*   **Build**: `npm run build`
*   **Lint**: `npm run lint`
*   **Banco de Dados**:
    *   Sincronizar Schema: `npx prisma db push` (Uso obrigatório após mudar o .prisma)
    *   Gerar Types: `npx prisma generate`
    *   Visualizar Dados: `npx prisma studio`

## 🎨 Guia de Design (Design System)
*   **Estética**: Premium SaaS Moderno (Dark-mode first / High Contrast).
*   **Cores**: 
    *   Base: `Slate` (Ardósia).
    *   Destaque: Gradiente `Violet-600` para `Blue-600`.
    *   Status: `Emerald` (Sucesso), `Amber` (PRO/Premium), `Red` (Alerta).
*   **Fontes**: `Outfit` (Display/Títulos), `Inter` (Corpo de texto).
*   **Componentes**: Uso intensivo de `backdrop-blur`, gradientes suaves e micro-animações.

## 🚀 Infraestrutura & Deployment
*   **Framework**: Next.js 16.2.3 (Turbopack).
*   **Deploy**: Easypanel (Docker).
*   **Banco**: PostgreSQL (Prisma ORM).
*   **Estratégia**: Rotas sensíveis ao Banco (`sitemap.xml`, `robots.txt`) estão configuradas como `force-dynamic` para evitar erros de conexão durante o build no Easypanel.

## 📝 Estado Atual & Regras
*   **Type Casting**: Em caso de dessincronização entre o gerador do Prisma e o compilador Next durante o build, usar `as any` em métricas e status para garantir a estabilidade do pipeline de deploy.
*   **SEO**: SEO Master implementado com metadados dinâmicos e OpenGraph.
*   **CRM**: Mini-CRM funcional para gestores acompanharem leads via painel `/dashboard/leads`.
*   **Admin**: Painel administrativo acessível em `/dashboard/admin` para moderação e verificação de usuários.
